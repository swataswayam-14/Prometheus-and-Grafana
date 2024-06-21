# Monitoring an Express Application with Prometheus and Grafana

## Overview

This repository provides a comprehensive setup for monitoring an Express application using Prometheus and Grafana. The setup includes containerizing the Express application and Prometheus, as well as configuring Grafana for visualization and alerting.


## Components 

### Express Application
- The Express application is containerized and exposes metrics through a metrics endpoint.

### Prometheus
- Prometheus is used to scrape and store the metrics from the Express application.
- It is configured to scrape metrics at regular intervals and alert when specified conditions are met.

### Grafana
- Grafana is used to visualize the metrics collected by Prometheus.
- It provides a user-friendly interface for creating dashboards and alerts based on the metrics.