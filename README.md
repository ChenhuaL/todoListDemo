# TodoList 项目

这是一个基于 Spring Boot 的简单 TodoList 应用，支持待办事项的添加、删除、标记完成状态和查询功能。

## 技术栈

- **后端**: Spring Boot, Spring Data JPA
- **前端**: HTML, CSS, JavaScript
- **数据库**: MySQL

## 运行方式

### 1. 环境要求

- JDK 1.8 或更高版本
- Maven 3.6 或更高版本
- MySQL 5.7 或更高版本

### 2. 数据库配置

1. 创建名为 `todolist` 的数据库
2. 修改 `src/main/resources/application.yml` 文件中的数据库连接信息（如果需要）：
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/todolist?useSSL=false&serverTimezone=UTC
       username: root
       password: root
   ```

### 3. 构建与运行

#### 使用 Maven 命令

```bash
# 构建项目
mvn clean package

# 运行应用
java -jar target/todoListDemo-0.0.1-SNAPSHOT.jar
```

#### 在 IDE 中运行

1. 导入项目到 IDE（IntelliJ IDEA, Eclipse 等）
2. 运行 `TodoListDemoApplication.java` 类的 main 方法

### 4. 访问应用

应用启动后，打开浏览器访问：
```
http://localhost:8080
```

## 功能说明

- **添加待办事项**: 输入标题、描述、选择分类和优先级、设置截止日期，点击"添加"按钮
- **标记完成状态**: 点击待办事项前面的复选框
- **删除待办事项**: 点击待办事项右侧的删除按钮
- **查看所有待办事项**: 页面默认显示所有待办事项，按优先级降序排序

## 注意事项

- 应用启动时会自动创建数据库表结构（基于 JPA 的自动建表功能）
- 确保 MySQL 服务已启动并且配置的用户有足够的权限
- 如需修改服务器端口，可在 `application.yml` 文件中调整 `server.port` 配置