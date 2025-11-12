package com.todolistdemo.controller;

import com.todolistdemo.entity.Item;
import com.todolistdemo.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todolist")
public class TodoListController {

    @Autowired
    private TodoListService todoListService;
    /**
     * 添加
     * @return
     */
    @PostMapping("/add")
    public String add(@RequestBody Item item) {
        todoListService.add(item);
        return "add success";
    }

    /**
     * 删除
     * @return
     */
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        todoListService.deleteById(id);
        return "delete success";
    }
    /**
     * 标记
     * @return
     */
    @GetMapping("/mark/{id}/{completed}")
    public String mark(@PathVariable Long id, @PathVariable boolean completed) {
        todoListService.mark(id, completed);
        return "mark success";
    }
    /**
     * 查询
     * @return
     */
    @GetMapping("/query")
    public List<Item> query() {
        return todoListService.query();
    }
}
