package com.example.demo.service;

import com.example.demo.model.PaperStatus;

public interface EditorService {
    void assignPaperToEditor(Long paperId, Long editorId);
    void makeDecision(Long paperId, PaperStatus decision);
}
