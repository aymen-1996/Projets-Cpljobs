package com.bna.ebanking.exceptions;

import org.springframework.web.bind.annotation.CrossOrigin;


public class CustomerNotFoundException extends Exception {
    public CustomerNotFoundException(String message) {
        super(message);
    }
}
