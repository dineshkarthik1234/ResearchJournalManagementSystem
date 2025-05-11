package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.model.Author;
import com.example.demo.model.Editor;
import com.example.demo.model.Reviewer;

public interface AdminService {
    Admin createAdmin(Admin admin);
    Author createAuthor(Author author);
    Editor createEditor(Editor editor);
    Reviewer createReviewer(Reviewer reviewer);
}
