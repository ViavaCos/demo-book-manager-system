import React from 'react'
import '../styles/BookManagerSystem.css'
class BMS extends React.Component {

    state = {
        bookList: null,
        bookID: '',
        bookName: ''
    }

    // ******************************************* 函数方法区域 **********************************************

    // 获取图书列表
    getBooks () {
        const data = [
            { id: 1, bookName: '西游记' },
            { id: 2, bookName: '红楼梦' },
            { id: 3, bookName: '水浒传' },
        ]
        setTimeout(() => {
            this.setState({
                bookList: data
            })
        }, 500)
    }
    // 绑定数据
    handleData = (attr, e) => {
        // console.log(e.target.value)
        // console.log(this);
        this.setState({
            [attr]: e.target.value
        })
    }
    // 提交
    handleSubmit = () => {

        let { bookID, bookName, bookList } = this.state

        bookID = parseInt(bookID)
        // console.log(bookID, "-----")

        // 数据校验 --- 非空判断
        if (!bookID) {
            alert('请输入图书编号');
            return;
        }

        if (!bookName) {
            alert('请输入图书名称');
            return;
        }

        // 数据校验 --- 重复判断
        const arr = bookList.filter(item => {
            // console.log(item.id, typeof item.id)
            // console.log(bookID, typeof bookID)
            // console.log(item.id === bookID)
            return item.id === bookID
        })

        if (arr.length) {
            alert('图书已存在');
            return;
        }


        // BUG：这样写不行,写完之后页面无法更新视图。虽然检测数据中是有新数据的。
        // const data = this.state.bookList;

        // 所以需要浅拷贝一下，并且复杂数据类型的似乎最好都是拷贝一份再对副本进行操作。
        const data = [...bookList];

        // data.push(
        //     <tr key={bookID}>
        //         <td>{bookID}</td>
        //         <td>{bookName}</td>
        //         <td>
        //             <a href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
        //             <span className="line">|</span>
        //             <a href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
        //         </td>
        //     </tr>
        // )

        data.push({ id: bookID, bookName })

        // 修改状态值
        this.setState({
            bookList: data,
            // bookID: '',
            // bookName: ''
        })

        // console.log(this.state.bookList)
    }
    // ******************************************* 钩子函数区域 **********************************************
    componentDidMount () {
        this.getBooks()
    }

    render () {

        // 在render函数中处理数据
        // tips: map方法返回一个新数组(踩了不太熟的坑)
        const bookList = this.state.bookList && this.state.bookList.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.bookName}</td>
                <td>
                    <a href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
                    <span className="line">|</span>
                    <a href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
                </td>
            </tr>
        ))


        return (
            <div className="wrapper">
                <div className="title">图书管理系统</div>
                <div className="addNew">
                    <span>图书编号：</span>
                    <input value={this.state.bookID} onChange={this.handleData.bind(this, 'bookID')} type="text" />
                    <span>图书名称：</span>
                    <input value={this.state.bookName} onChange={this.handleData.bind(this, 'bookName')} type="text" />
                    <button onClick={this.handleSubmit}>提交</button>
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
                        {/* 提示信息 */}
                        {
                            !this.state.bookList && <tr>
                                <td colSpan="3">数据加载中...</td>
                            </tr>
                        }

                        {/* <tr>
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
                        </tr> */}

                        {bookList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BMS