#!/bin/bash
#ECR Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 047198061298.dkr.ecr.ap-south-1.amazonaws.com

#Pulling image from ECR
docker pull 047198061298.dkr.ecr.ap-south-1.amazonaws.com/unifiedappadminfrontend:latest

##Changing image tag
docker image tag 047198061298.dkr.ecr.ap-south-1.amazonaws.com/unifiedappadminfrontend:latest unifiedappadminfrontend:latest

#stop and remove the current container docker rm -f unifiedappadminfrontend
docker stop unifiedappadminfrontend || true
docker rm unifiedappadminfrontend || true

#Creating and starting a docker container using a new image
docker run -d -p 8088:80 --name unifiedappadminfrontend unifiedappadminfrontend:latest

