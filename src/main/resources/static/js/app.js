/**
 * TodoList 应用的JavaScript逻辑
 */

// 后端API基础URL
const API_BASE_URL = '/todolist';

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 初始化事件监听器
    initEventListeners();
    // 加载Todo列表
    loadTodos();
});

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    // 提交表单事件
    const addForm = document.getElementById('add-todo-form');
    if (addForm) {
        addForm.addEventListener('submit', handleAddTodo);
    }
}

/**
 * 处理添加Todo项
 */
async function handleAddTodo(event) {
    event.preventDefault();
    
    // 获取表单数据
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;
    
    // 简单验证
    if (!title.trim()) {
        alert('请输入标题');
        return;
    }
    
    // 创建Todo对象
    const todoItem = {
        title: title,
        description: description,
        category: category || 'default',
        priority: parseInt(priority) || 1,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };
    
    try {
        // 调用后端API添加Todo
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoItem)
        });
        
        if (response.ok) {
            // 重置表单
            document.getElementById('add-todo-form').reset();
            // 重新加载Todo列表
            loadTodos();
            alert('添加成功');
        } else {
            alert('添加失败: ' + await response.text());
        }
    } catch (error) {
        console.error('添加Todo失败:', error);
        alert('添加失败，请检查网络连接');
    }
}

/**
 * 加载Todo列表
 */
async function loadTodos() {
    try {
        // 调用后端API获取Todo列表
        const response = await fetch(`${API_BASE_URL}/query`);
        
        if (response.ok) {
            const todos = await response.json();
            // 渲染Todo列表
            renderTodoList(todos);
        } else {
            console.error('加载Todo列表失败:', await response.text());
            renderTodoList([]);
        }
    } catch (error) {
        console.error('加载Todo列表失败:', error);
        renderTodoList([]);
    }
}

/**
 * 渲染Todo列表
 */
function renderTodoList(todos) {
    const todoListElement = document.getElementById('todo-list');
    if (!todoListElement) return;
    
    // 清空现有列表
    todoListElement.innerHTML = '';
    
    if (todos.length === 0) {
        todoListElement.innerHTML = '<li class="empty-message">暂无待办事项</li>';
        return;
    }
    
    // 遍历所有Todo项并添加到列表
    todos.forEach(todo => {
        const todoItemElement = createTodoItemElement(todo);
        todoListElement.appendChild(todoItemElement);
    });
}

/**
 * 创建单个Todo项的DOM元素
 */
function createTodoItemElement(todo) {
    // 创建li元素
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // 格式化日期
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN');
    };
    
    // 获取优先级标签样式类
    const getPriorityClass = (priority) => {
        if (priority >= 3) return 'priority-high';
        if (priority === 2) return 'priority-medium';
        return 'priority-low';
    };
    
    // 获取优先级文本
    const getPriorityText = (priority) => {
        if (priority >= 3) return '高';
        if (priority === 2) return '中';
        return '低';
    };
    
    // 设置li内容
    li.innerHTML = `
        <div class="todo-content">
            <div class="todo-title ${todo.completed ? 'completed' : ''}">${todo.title}</div>
            ${todo.description ? `<div class="todo-description">${todo.description}</div>` : ''}
            <div class="todo-meta">
                <span class="category-tag">${todo.category}</span>
                <span class="priority-tag ${getPriorityClass(todo.priority)}">优先级: ${getPriorityText(todo.priority)}</span>
                ${todo.dueDate ? `<span>截止日期: ${formatDate(todo.dueDate)}</span>` : ''}
            </div>
        </div>
        <div class="todo-actions">
            <button class="mark" data-id="${todo.id}" data-completed="${todo.completed}">${todo.completed ? '标记未完成' : '标记完成'}</button>
            <button class="delete" data-id="${todo.id}">删除</button>
        </div>
    `;
    
    // 添加事件监听器
    const markButton = li.querySelector('.mark');
    const deleteButton = li.querySelector('.delete');
    
    markButton.addEventListener('click', () => {
        const newCompletedState = !todo.completed;
        markTodoAsCompleted(todo.id, newCompletedState);
    });
    
    deleteButton.addEventListener('click', () => {
        if (confirm('确定要删除这个待办事项吗？')) {
            deleteTodo(todo.id);
        }
    });
    
    return li;
}

/**
 * 标记Todo项为完成或未完成
 */
async function markTodoAsCompleted(id, completed) {
    try {
        // 调用后端API标记Todo
        const response = await fetch(`${API_BASE_URL}/mark/${id}/${completed}`, {
            method: 'GET'
        });
        
        if (response.ok) {
            // 重新加载Todo列表
            loadTodos();
        } else {
            alert('更新失败: ' + await response.text());
        }
    } catch (error) {
        console.error('更新Todo状态失败:', error);
        alert('更新失败，请检查网络连接');
    }
}

/**
 * 删除Todo项
 */
async function deleteTodo(id) {
    try {
        // 调用后端API删除Todo
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // 重新加载Todo列表
            loadTodos();
        } else {
            alert('删除失败: ' + await response.text());
        }
    } catch (error) {
        console.error('删除Todo失败:', error);
        alert('删除失败，请检查网络连接');
    }
}