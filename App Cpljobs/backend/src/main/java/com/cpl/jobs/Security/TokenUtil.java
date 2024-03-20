package com.cpl.jobs.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenUtil {

    private final String CLAIMS_SUBJECT = "sub";
    private final String CLAIMS_CREATED = "created";

    @Value("${auth.expiration}")
    private Long TOKEN_VALIDITY;

    @Value("${auth.secret}")
    private String TOKEN_SECRET;

    @Value("${refresh-token.expiration}")
    private long refreshExpiration;

    public Long getTokenValidity() {
        return TOKEN_VALIDITY;
    }
    public Long getrefreshTokenValidity() {
        return refreshExpiration;
    }
    public String generateToken(UserDetails userDetails) {
        return generateTokenWithExpiration(userDetails, TOKEN_VALIDITY);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateTokenWithExpiration(userDetails, refreshExpiration);
    }

    public String getUserNameFromToken(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (Exception ex) {
            return null;
        }
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = getUserNameFromToken(token);
        return (username != null && userDetails != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expiration = getClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    private Claims getClaims(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey(TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception ex) {
            claims = null;
        }

        return claims;
    }

    private Date generateExpirationDate(long expirationTimeInSeconds) {
        return new Date(System.currentTimeMillis() + expirationTimeInSeconds * 1000);
    }

    private String generateTokenWithExpiration(UserDetails userDetails, long expirationTimeInSeconds) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIMS_SUBJECT, userDetails.getUsername());
        claims.put(CLAIMS_CREATED, new Date());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate(expirationTimeInSeconds))
                .signWith(SignatureAlgorithm.HS512, TOKEN_SECRET)
                .compact();
    }
}
