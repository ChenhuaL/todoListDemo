package com.todolistdemo.service;

import java.util.List;

import com.todolistdemo.entity.Item;

public interface TodoListService {

    /**
     * 添加一个待办事项
     * @param item
     */
    void add(Item item);

    /**
     * 删除一个待办事项
     *
     * @param id
     * @param id
     */
    void deleteById(Long id);

    void mark(Long id, boolean completed);

    List<Item> query();
}
