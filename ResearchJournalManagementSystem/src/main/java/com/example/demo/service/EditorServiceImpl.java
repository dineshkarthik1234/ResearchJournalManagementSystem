package com.example.demo.service;

import com.example.demo.model.Editor;
import com.example.demo.model.Paper;
import com.example.demo.model.PaperStatus;
import com.example.demo.repository.EditorRepository;
import com.example.demo.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditorServiceImpl implements EditorService {
    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Override
    public void assignPaperToEditor(Long paperId, Long editorId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found"));
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new RuntimeException("Editor not found"));
        paper.setEditor(editor);
        paper.setStatus(PaperStatus.ASSIGNED_TO_EDITOR);
        paperRepository.save(paper);
    }

    @Override
    public void makeDecision(Long paperId, PaperStatus decision) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found"));
        if (decision == PaperStatus.ACCEPTED || decision == PaperStatus.REJECTED) {
            paper.setStatus(decision);
            paperRepository.save(paper);
        } else {
            throw new RuntimeException("Invalid decision");
        }
    }
}
