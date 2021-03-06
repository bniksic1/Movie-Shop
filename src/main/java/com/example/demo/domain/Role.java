package com.example.demo.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "tbl_role")
public class Role{
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(targetEntity = User.class, mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<User> users;

    public Role() {
    }

    public Role(Long id, @NotNull String name) {
        this.id = id;
        this.name = name;
    }

    public Role(Long id, String name, Set<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Map<String, String> toHashMap(){
        Map<String, String> map = new HashMap<>();
        map.put("id", Long.toString(id));
        map.put("name", name);
        return map;
    }
}
