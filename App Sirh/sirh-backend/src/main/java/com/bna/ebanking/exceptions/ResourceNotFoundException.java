package com.bna.ebanking.exceptions;

import org.springframework.web.bind.annotation.CrossOrigin;


public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message){
        super(message);
    }
}
