package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.model.Author;
import com.example.demo.model.Editor;
import com.example.demo.model.Reviewer;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.EditorRepository;
import com.example.demo.repository.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private ReviewerRepository reviewerRepository;

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Editor createEditor(Editor editor) {
        return editorRepository.save(editor);
    }

    @Override
    public Reviewer createReviewer(Reviewer reviewer) {
        return reviewerRepository.save(reviewer);
    }
}
