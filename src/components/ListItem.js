import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const completedStyles = () => {
      if (this.props.todo.completed) {
        return 'list-task complete';
      } else {
        return 'list-task';
      }
    };

    return (
      <li key={this.props.index} className='todo-item'>
        <div className={completedStyles()}>
          <i className='fa-solid fa-pen-to-square'></i>
          {this.props.todo.task}
        </div>
        <div className='buttons'>
          <input
            className='delete-item'
            onClick={() => this.props.onClickDelete(this.props.index)}
            type='button'
            value='X'
            title='Delete Item'
          />
          <input
            onClick={() => this.props.completeTask(this.props.index)}
            type='checkbox'
            name='completed'
            className='check-complete'
            value={this.props.todo.completed || false}
            defaultChecked={this.props.todo.completed || false}
            title='Check Complete'
          />
        </div>
      </li>
    );
  }
}

export default ListItem;
