import React from 'react'
import '../styles/editBook.css'

class EditBook extends React.Component {

    state = {
        id: '',
        bookName: '',
        isShow: null
    }

    componentDidMount () {
        // console.log(this.props)
        const { id, bookName } = this.props.data
        this.setState({
            id,
            bookName
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

    // 关闭弹窗
    handleClose = (e) => {
        e.preventDefault()
        // console.log(this.props.isShow)
        this.props.isShow(false)
    }

    // 保存数据
    handleSave = () => {
        const { bookName, id } = this.state
        this.props.save({ bookName, id })
    }

    render () {
        const { id, bookName } = this.state

        return (
            <div className="container">
                <div className="cover"></div>
                <div className="card">
                    <div className="title">
                        <span>编辑图书</span>
                        <a href="https://github.com/ViavaCos/demo-book-manager-system" onClick={this.handleClose} className="close">X</a>
                    </div>
                    <div className="content">
                        <div className="item">
                            <label htmlFor="bookID" >图书编号：</label>
                            <input placeholder="Not required" readOnly value={id} onChange={this.handleData.bind(this, "id")} type="text" id="bookID" />
                        </div>
                        <div className="item">
                            <label htmlFor="bookName">图书名称：</label>
                            <input value={bookName} onChange={this.handleData.bind(this, "bookName")} type="text" id="bookID" />
                        </div>
                        <div className="item">
                            <button onClick={this.handleSave}>修改</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditBook