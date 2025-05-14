# SIT737 Task 10.1P - Monitoring & Visibility

## 👩‍💻 Student Details
- **Name:** Mariya Theresa Shibu  
- **Student ID:** 223992433

---

## 📦 Project Overview
This project demonstrates containerizing a Node.js monitoring application and deploying it to Google Kubernetes Engine (GKE) with visibility and monitoring using Google Cloud tools.

---

## 🚀 Deployment & Configuration Steps

### 1. DockerHub Setup
- Built Docker image from local project folder:
  docker build -t mariyatheresa/sit737-monitoring-app .
  
Pushed to DockerHub:
docker push mariyatheresa/sit737-monitoring-app

2. GKE Cluster Creation
Enabled required APIs:
Kubernetes Engine
Monitoring
Logging
Created default VPC network:
gcloud compute networks create default --subnet-mode=auto

Created GKE cluster:
gcloud container clusters create sit737-cluster --num-nodes=1 --zone=australia-southeast1-a

3. Kubernetes Deployment
Applied manifests:
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

5. NodePort Access & Firewall
Created firewall rule:
gcloud compute firewall-rules create allow-nodeport --allow tcp:31234 --target-tags=gke-node --direction=INGRESS --priority=1000 --network=default

Tagged the instance:
gcloud compute instances add-tags <INSTANCE_NAME> --tags=gke-node --zone=australia-southeast1-a

Accessed the application via:
http://<VM_EXTERNAL_IP>:31234

Monitoring & Logging

Metrics Explorer
Resource Type: Kubernetes Pod
Metric: Pod first ready latency
Filter: namespace = default
Visualization: Line chart

Logs Explorer
Query:
resource.type="k8s_container"
resource.labels.cluster_name="sit737-cluster"

Result: Showed log events confirming container activity.

Cleanup Steps
To prevent billing:
gcloud container clusters delete sit737-cluster --zone=australia-southeast1-a
gcloud compute firewall-rules delete allow-nodeport
gcloud compute instances delete <INSTANCE_NAME> --zone=australia-southeast1-a
gcloud compute addresses delete <ADDRESS_NAME> --region=australia-southeast1
