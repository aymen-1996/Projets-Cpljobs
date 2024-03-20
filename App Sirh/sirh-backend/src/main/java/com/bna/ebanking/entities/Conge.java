package com.bna.ebanking.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conge")

public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String dateDebut;


    private String dateFin;

    @Column(name = "statut")
    private String statut;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;
}
