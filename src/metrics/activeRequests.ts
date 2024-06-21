import client from "prom-client";
import { requestCounter } from ".";
import { Request, Response, NextFunction } from "express";

const activeRequestGauge = new client.Gauge({
    name:'active_requests',
    help:'Number of active requests'
});

const httpRequestDuration = new client.Histogram({
    name:'http_request_duration_ms',
    help:'Duration of HTTP requests in ms', 
    labelNames:['method', 'route', 'status_code'],
    buckets:[0.1, 0.5, 5, 10 , 15, 100, 200, 400, 1000, 5000]
});

export const activeRequestGaugeMiddleWare = (req:Request, res:Response, next: NextFunction) => {
  
    const startTime = Date.now();
    activeRequestGauge.inc();

    res.on('close', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`The request took ${duration}ms`);

        requestCounter.inc({
            method:req.method,
            route:req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

        httpRequestDuration.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        }, duration);
    
        activeRequestGauge.dec();
    });
    next();
};

