package com.todolistdemo.service.impl;

import com.todolistdemo.entity.Item;
import com.todolistdemo.repository.TodoListRepository;
import com.todolistdemo.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoListServiceImpl implements TodoListService {

    @Autowired
    private TodoListRepository todoListRepository;
    @Override
    public void add(Item item) {
        item.setCreatedAt(LocalDateTime.now());
        item.setUpdatedAt(LocalDateTime.now());
        item.setCompleted(false);
        if (item.getCategory() == null) {
            item.setCategory("default");
        }
        if (item.getPriority() == 0) {
            item.setPriority(1);
        }
        todoListRepository.save(item);
    }

    @Override
    public void deleteById(Long id) {
        todoListRepository.deleteById(id);
    }

    @Override
    public void mark(Long id, boolean  completed) {
        Item item = todoListRepository.getById(id);
        
        item.setCompleted(completed);
        item.setUpdatedAt(LocalDateTime.now());

        todoListRepository.save(item);
    }

    @Override
    public List<Item> query() {
        List<Item> all = todoListRepository.findAll();
        all = all.stream().sorted(Comparator.comparing(Item::getPriority).reversed()).collect(Collectors.toList());
        return all;
    }
}
