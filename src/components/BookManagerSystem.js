import React from 'react'
import '../styles/BookManagerSystem.css'
import EditBook from './editBook'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/'
class BMS extends React.Component {

    state = {
        bookList: [],
        bookID: '',
        bookName: '',
        isShow: false,
        currentEdit: null
    }

    // ******************************************* 函数方法区域 **********************************************

    // 获取图书列表
    async getBooks () {
        const res = await axios.get('books')
        // console.log(res);

        this.setState({
            bookList: res.data
        })

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
    handleSubmit = async () => {

        let { bookName } = this.state

        if (!bookName) {
            alert('请输入图书名称');
            return;
        }

        // 数据校验 --- 重复判断
        // const arr = bookList.filter(item => {
        //     return item.bookName === bookName
        // })

        // if (arr.length) {
        //     alert('图书已存在');
        //     return;
        // }

        const flag = await axios.get(`books/book/${bookName}`)
        console.log(flag);
        
        if(flag.data.status===1){
            // 已存在
            alert('该图书名已存在')
            return
        }

        const res = await axios.post('books', { bookName });

        if (res.status === 200) {
            alert('添加成功')
            this.getBooks()
            this.setState({
                bookName: ''
            })
        }
    }
    // 删除图书
    async handleDelete (id, e) {
        // 此方法无法在React中阻止默认行为
        // return false

        // 定义的方法中默认最后一个参数就是 React中封装的 事件对象
        e.preventDefault();

        if (window.confirm('你确定要删除该图书吗？删除后将无法恢复!')) {

            const res = await axios.delete(`books/${id}`)
            if (res.status === 200) {
                alert('删除成功')
                this.getBooks()
            }
        }
    }
    // 编辑图书
    handleEdit = async (id, e) => {
        e.preventDefault();
        // console.log(id)

        // const currentEdit = this.state.bookList && this.state.bookList.find(item => {
        //     return item.id === id
        // })

        const res = await axios.get(`books/${id}`)

        this.setState({
            currentEdit: res.data
        })
        this.close()
        // console.log(res);

    }

    // 保存编辑
    saveEditChange = async ({ bookName, id }) => {
        // console.log(bookName)
        // console.log(id)
        // let bookList = [...this.state.bookList]
        // let flag = bookList.some(item => {
        //     // console.log('id:',id)
        //     // console.log('item.id',item.id)
        //     if (item.id === id) {
        //         item.bookName = bookName
        //         // console.log('修改后的值：',item.bookName);
        //         return true;
        //     }
        //     return false
        // })
        // console.log('flag:',flag);

        // const bookList = [...this.state.bookList]

        // const flag = bookList.findIndex(item => {
        //     if (item.id === id) {
        //         return false
        //     }
        //     return item.bookName === bookName
        // })
        // // console.log(flag);

        // if (flag !== -1) {
        //     alert('该图书名已存在')
        //     return
        // }


        const flag = await axios.get(`books/book/${bookName}`)
        console.log(flag);
        
        if(flag.status===200){
            // 已存在
            alert('该图书名已存在')
            return
        }

        const res = await axios.put(`books/${id}`, { bookName })

        if (res.status === 200) {
            alert('修改成功')
            // this.setState({
            //     bookList
            // })
            this.close(false)
            this.getBooks()
        }
        // console.log(bookList);
    }

    // 操作弹窗
    close = (status) => {
        // console.log(status)
        this.setState({
            isShow: status === false ? status : true
        })
    }

    // ******************************************* 钩子函数区域 **********************************************
    componentDidMount () {
        this.getBooks()
    }

    render () {
        const { isShow, currentEdit } = this.state

        // 在render函数中处理数据
        // tips: map方法返回一个新数组(踩了不太熟的坑)
        const bookList = this.state.bookList && this.state.bookList.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.bookName}</td>
                <td>
                    <a onClick={this.handleEdit.bind(this, item.id)} href="https://github.com/ViavaCos/demo-book-manager-system">编辑</a>
                    <span className="line">|</span>
                    <a onClick={this.handleDelete.bind(this, item.id)} href="https://github.com/ViavaCos/demo-book-manager-system">删除</a>
                </td>
            </tr>
        ))

        return (
            <div className="wrapper">
                <div className="title">图书管理系统</div>
                <div className="addNew">
                    <span>图书编号：</span>
                    <input placeholder="Not required" readOnly value={this.state.bookID} onChange={this.handleData.bind(this, 'bookID')} type="text" />
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
                        {!this.state.bookList.length && <tr><td colSpan="3">暂无数据</td></tr>}

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

                        {/* 数据渲染 */}
                        {bookList}
                    </tbody>
                </table>

                {/* 图书编辑 */}
                {isShow && <EditBook data={currentEdit} isShow={this.close} save={this.saveEditChange} />}
            </div>
        )
    }
}

export default BMS