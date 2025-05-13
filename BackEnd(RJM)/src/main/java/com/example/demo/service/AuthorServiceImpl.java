package com.example.demo.service;

import com.example.demo.model.Author;
import com.example.demo.model.Paper;
import com.example.demo.model.PaperStatus;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthorServiceImpl implements AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Override
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Paper submitPaper(Long authorId, Paper paper) {
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        paper.setAuthor(author);
        paper.setStatus(PaperStatus.SUBMITTED);
        paper.setSubmissionDate(new Date());
        return paperRepository.save(paper);
    }
}