package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TicketController {

    @Autowired
    TicketRepository repo;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody Ticket t) {

        return repo.save(t);
    }

    @GetMapping("/tickets")
    public List<Ticket> getTickets() {

        return repo.findAll();
    }

    @PutMapping("/scan/{id}")
    public String scanTicket(@PathVariable int id) {

        Ticket t = repo.findById(id).orElse(null);

        if(t == null) {
            return "Invalid Ticket";
        }

        if(t.isUsed()) {
            return "Ticket Already Used";
        }

        t.setUsed(true);

        repo.save(t);

        return "Entry Allowed";
    }
}