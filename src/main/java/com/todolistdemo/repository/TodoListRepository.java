package com.todolistdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todolistdemo.entity.Item;

@Repository
public interface TodoListRepository extends JpaRepository<Item, Long> {
    /**
     * 删除
     * @param id
     */
    void deleteById(Long id);

}
