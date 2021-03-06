package com.example.demo.config;

import java.io.IOException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.jsonwebtoken.Claims;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class JwtFilter extends OncePerRequestFilter {
    private static Logger log = LoggerFactory.getLogger(JwtFilter.class);

    private JwtProvider tokenProvider;

    public JwtFilter(JwtProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JwtTokenFilter : doFilterInternal");
        String token = request.getHeader("Authorization");
        if(token != null){
            try{
                Claims claims = tokenProvider.getClaimsFromToken(token);
                if(!claims.getExpiration().before(new Date())){
                    Authentication authentication = tokenProvider.getAuthentication(claims.getSubject());
                    if(authentication.isAuthenticated())
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (RuntimeException e){
                try {
                    SecurityContextHolder.clearContext();
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().println(
                            new JSONObject().put("exception", "Expired or invalid JWT token. " + e.getMessage()));
                } catch (IOException | JSONException e1) {
                    e1.printStackTrace();
                }
                return;
            }
        } else
            log.info("first time so creating token using UserResourceImpl - authenticate method");

        filterChain.doFilter(request, response);
    }
}
