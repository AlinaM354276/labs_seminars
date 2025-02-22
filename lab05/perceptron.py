##########################################################
#           PERCEPTRON ALGORITHM FROM SCRATCH            #
##########################################################

# import packages
import numpy as np
import pandas as pd

# class for Perceptron algorithm
class PerceptronAlgorithm(object):
    
    # hyperparameters definition
    def __init__(self, eta, max_epochs, threshold):
        self.eta = eta
        self.max_epochs = max_epochs
        self.threshold = threshold
    
    # random initialization of weights and biases
    def get_weights(self, n):
        self.w = np.random.rand(n)
        self.b = np.random.rand(1)
    
    # linear combination
    def input_net(self, x):
    # If x is a 2D array (multiple samples), perform matrix multiplication
        if len(x.shape) > 1:
            net = np.dot(x, self.w) + self.b
        else:
            # If x is a 1D array (single sample), compute dot product
            net = np.dot(x, self.w) + self.b
        return net


    # Activation function Heaviside
    def f(self, net):
        # If net is an array, apply the condition element-wise
        if isinstance(net, np.ndarray):
            return np.where(net >= 0.5, 1, 0)
        else:
            # If net is a scalar, apply the condition directly
            return 1 if net >= 0.5 else 0

    
    # make prediction results
    def predict(self, x):
        if len(x.shape) == 1:  # Если один образец
            return self.f(self.input_net(x))
        else:  # Если массив образцов
            net = self.input_net(x)
            return np.array([self.f(n) for n in net])
    
    # loss function
    def loss_fn(self, y, y_pred):
        loss = (y - y_pred)
        return loss        
    
    # training step
    def fit(self, x_train, y_train):
        n = x_train.shape[0]
        E = 2 * self.threshold
        count = 0
        self.get_weights(x_train.shape[1])
        cost = list()
        
        # training in each epoch
        while (E >= self.threshold and count <= self.max_epochs + 1):
            E = 0
            
            # stochastic gradient descendent algorithm (SGD) -> for each sample
            for i in range(n):
                xi = x_train[i, :]
                yi = y_train[i]
                
                # output predition
                y_hat = self.predict(xi)
                
                # calculate loss
                error = self.loss_fn(yi, y_hat)
                E = E + error**2
                
                # calculate gradients
                dE_dW = -error * xi
                dE_db = -error

                # adapt weights and biases                
                self.w = self.w - self.eta * dE_dW
                self.b = self.b - self.eta * dE_db
                
            # count number of epochs
            count = count + 1
            
            # calculate mean square error (MSE)
            E = 1/2 * (E/n)
            cost.append(E)            
            
            # print results of convergence process
            print('Epoch ', count, ' ===> error = ', E, '... \n')
            
        self.n_epochs = count
        self.loss = E
        self.cost_ = cost
        
        return self
    
    # function to make iterative process of test
    def test(self, x_test, y_test):
        n = x_test.shape[0]
        self.accuracy = 0 
        y_pred = list()
        
        for i in range(n):
            xi = x_test[i, :]
            yi = y_test[i]
            y_pred.append(self.predict(xi))

            # verify correct classification            
            if y_pred[i] == yi:
                self.accuracy = self.accuracy + 1
        
        # calculate accuracy
        self.accuracy = 100 * round(self.accuracy/n, 5)
        
        return y_pred
