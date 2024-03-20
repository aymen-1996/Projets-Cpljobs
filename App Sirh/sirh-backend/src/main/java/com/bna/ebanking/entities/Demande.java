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
@Table(name = "demande")
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "document")
    private String document;

    @Column(name = "message")
    private String message;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

}
