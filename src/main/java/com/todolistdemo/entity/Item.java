package com.todolistdemo.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "completed")
    private boolean completed;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "category")
    private String category; // 扩展功能：分类
    @Column(name = "priority")
    private int priority; // 扩展功能：优先级
    @Column(name = "due_date")
    private LocalDateTime dueDate; // 扩展功能：截止日期
}
