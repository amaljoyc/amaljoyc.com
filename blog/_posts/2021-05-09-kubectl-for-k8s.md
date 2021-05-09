---
title: "Setup kubectl for Kubernetes"
date: 2021-05-09
tags:
  - kubernetes
---

`kubectl` is a command line tool to connect to your kubernetes clusters and run various commands against it in order to view, inspect or deploy various applications and resources. Once setup, all your remote or local kubernetes clusters can be easily managed with this tool.

### Installation
You can use brew to install kubectl on your mac.
```
brew install kubectl
```

### Kubeconfig setup
kubectl needs a `kubeconfig` file inorder to connect to your cluster. Download your cluster configuration file from the k8s control panel. The file downloaded would be of the format `<clustername>-kubeconfig.yaml`.

Normally the kubeconfig files are store in the location `~/.kube/` and by default kubectl would pickup the config from default location of `~/.kube/config`. It is also possible to store the kubeconfig file location in an env variable called `KUBECONFIG` for eg, 
```
export KUBECONFIG=~/.kube/mycluster-kubeconfig.yaml
```

Once the kubeconfig is set, you can make use of all kubectl commands. Also, if you need to enable autocompletion for kubectl, you could add the following into your `.zshrc`.
```
source <(kubectl completion zsh)
```

### k9s - Another k8s cli
Maybe you also wanna try k9s, a terminal based UI to interact with your k8s clusters. It is a bit more intuitive when compared with kubectl. Go check it out [here](https://k9scli.io/) and you might like it.

To install k9s,
```
brew install k9s
```
If you have setup your kubeconfig already for kubectl, then you don't need to do any further configuration for setting up k9s and it should work out of the box.