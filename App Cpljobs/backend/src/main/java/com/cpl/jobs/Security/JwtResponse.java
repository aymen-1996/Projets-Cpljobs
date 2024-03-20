package com.cpl.jobs.Security;



import com.cpl.jobs.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class JwtResponse {
        private Long id;
        private String token;
        private String refreshtToken;
        private String nom;
        private String prenom;
        private String username;
        private String auth;
    private String email;
    private String role;
    private String pseudo;
    private String refrsehexpiration;







    public JwtResponse(String token, String refreshtToken , User user, String authExpiration , String refrsehexpiration ) {
            if(user!=null ) {
                this.id=user.getId();
                this.nom=user.getNom();;
                this.prenom=user.getPrenom();
                this.username=user.getEmail();
                this.role=user.getRole();
                this.email=user.getEmail();
                this.pseudo=user.getPseudo();



            }



            this.token = token;
            this.refreshtToken = refreshtToken;
            this.auth = authExpiration;
            this.refrsehexpiration=refrsehexpiration;


        }







    }


