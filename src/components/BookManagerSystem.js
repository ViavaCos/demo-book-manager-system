import React from 'react'
import '../styles/BookManagerSystem.css'

class BMS extends React.Component {

    render () {
        return (
            <div className="wrapper">
                <div className="title">图书管理系统</div>
                <div className="addNew">
                    <span>图书编号：</span>
                    <input type="text"/>
                    <span>图书名称：</span>
                    <input type="text"/>
                    <button>提交</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>图书编号</th>
                            <th>图书名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>西游记</td>
                            <td>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
                                <span className="line">|</span>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>红楼梦</td>
                            <td>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
                                <span className="line">|</span>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>水浒传</td>
                            <td>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
                                <span className="line">|</span>
                                <a href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BMS