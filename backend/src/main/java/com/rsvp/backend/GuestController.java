package com.rsvp.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "*")
public class GuestController {
    private List<Guest> guestList = new ArrayList<>();

    @PostMapping
    public Guest submitRSVP(@RequestBody Guest guest) {
        guestList.add(guest);
        return guest;
    }

    @GetMapping
    public List<Guest> getGuests() {
        return guestList;
    }
}
