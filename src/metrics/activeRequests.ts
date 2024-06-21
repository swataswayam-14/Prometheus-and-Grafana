import client from "prom-client";
import { requestCounter } from ".";
import { Request, Response, NextFunction } from "express";

const activeRequestGauge = new client.Gauge({
    name:'active_requests',
    help:'Number of active requests'
});

export const activeRequestGaugeMiddleWare = (req:Request, res:Response, next: NextFunction) => {
    console.log('in');
    
    const startTime = Date.now();
    activeRequestGauge.inc();

    res.on('close', () => {
        const endTime = Date.now();
        console.log(`The request took ${endTime - startTime}ms`);

        requestCounter.inc({
            method:req.method,
            route:req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        console.log('dec');
        
        activeRequestGauge.dec();
    });
    console.log('next');
    
    next();
};

