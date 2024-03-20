package com.bna.ebanking.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doc")
public class Doc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_de_contrat")
    private String type_contrat;

    @Column(name = "ancienneté")
    private String anciennete;

    @Column(name = "mobilité_interne")
    private String mobilite;

    @Column(name = "contrat")
    private String contrat;








}

