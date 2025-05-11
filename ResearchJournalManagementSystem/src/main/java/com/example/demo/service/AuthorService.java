package com.example.demo.service;

import com.example.demo.model.Author;
import com.example.demo.model.Paper;

public interface AuthorService {
    Author createAuthor(Author author);
    Paper submitPaper(Long authorId, Paper paper);
}