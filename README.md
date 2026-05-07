# 交互式曲线绘制软件

本项目是一个基于 Java SpringBoot + Vue 3 的交互式曲线绘制软件。
项目严格遵循“底层实现、不调包”的原则，所有曲线绘制、顶点插值、平滑连接及事件交互逻辑均基于原生 HTML5 Canvas API 和数学公式（Catmull-Rom 样条插值算法）手动实现。

## 核心功能

- **基础绘制功能**：支持鼠标交互绘制曲线，点击添加顶点，实时预览平滑曲线走向。
- **编辑交互**：支持对已绘制曲线的顶点进行拖拽编辑，实时更新曲线形状。
- **顶点管理**：支持顶点的增加和删除，并提供右侧属性面板显示所有顶点坐标。
- **数据持久化**：通过 SpringBoot 后端和 H2 内存数据库，支持曲线数据的云端保存与加载。
- **不依赖第三方绘图库**：无 ECharts、Fabric.js 等依赖，纯原生 Canvas 实现。

## 技术栈

### 前端

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Vite**
- **Pinia** (状态管理)
- **Vue Router** (页面路由)
- **Tailwind CSS** (基础样式与布局)
- **Lucide Vue Next** (图标库)
- **原生 Canvas API** (核心绘图)

### 后端

- **Java 17**
- **Spring Boot 3.2.x**
- **Spring Web** (RESTful API)
- **Spring Data JPA** (数据持久化)
- **H2 Database** (轻量级内存/文件数据库)
- **Lombok**

## 项目结构

```
gongye/
├── backend/             # SpringBoot 后端项目
│   ├── src/main/java    # Java 源码
│   ├── src/main/resources # 配置文件
│   └── pom.xml          # Maven 依赖
└── frontend/            # Vue 3 前端项目
    ├── src/
    │   ├── api/         # 后端接口请求
    │   ├── components/  # Vue 组件 (CanvasDrawer 等)
    │   ├── stores/      # Pinia 状态
    │   ├── utils/       # 核心算法 (插值、几何计算)
    │   └── views/       # 页面视图
    └── package.json     # Node 依赖
```

## 环境搭建与运行步骤

### 1. 启动后端 (Spring Boot)

确保已安装 **Java 17** 和 **Maven**。

进入 `backend` 目录，运行以下命令启动服务：

```bash
cd backend
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动，并自动初始化 H2 数据库。

### 2. 启动前端 (Vue 3)

确保已安装 **Node.js** (推荐 v18+)。

进入 `frontend` 目录，安装依赖并启动开发服务器：

```bash
cd frontend
npm install
npm run dev
```

前端应用将在 `http://localhost:5173` 启动。在浏览器中打开该地址即可使用。

## 核心算法说明

本项目的核心在于 **`frontend/src/utils/interpolation.ts`** 中的 `getCatmullRomCurve` 函数。
为了实现经过所有控制顶点的平滑曲线，项目采用 Catmull-Rom 样条插值算法：

1. 遍历所有相邻的四个顶点 (P0, P1, P2, P3)。
2. 基于张力参数 (Tension) 计算 P1 到 P2 之间的插值点。
3. 将所有生成的细分线段连接，交由 Canvas `lineTo` 渲染，最终呈现出光滑的曲线效果。
4. 顶点碰撞检测则通过计算欧几里得距离实现，判断鼠标点击位置是否在顶点的绘制半径内。

## 交付文档

除了本 README 外，项目还包含详细的代码解释文档，请参阅：

- `documents/documents/交互式曲线绘制软件 - 完整代码解释文档.md` (或导出的 PDF 版本)

