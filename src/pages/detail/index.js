import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';

class Detail extends PureComponent {
	render() {
		return (
			<DetailWrapper>
				<Header>{this.props.title}</Header>
				<Content
					dangerouslySetInnerHTML={{ __html: this.props.content }}
				/>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		this.props.getDetail(this.props.match.params.id);// 通过props.match获取上个页面传递而来的数据
	}
}

const mapState = (state) => ({
	title: state.getIn(['detail', 'title']),
	content: state.getIn(['detail', 'content'])
});

const mapDispatch = (dispatch) => ({
	getDetail(id) {
		dispatch(actionCreators.getDetail(id));
	}
});

// 由于引入了异步组件（loadable.js）因此需要这种方式传递参数
export default connect(mapState, mapDispatch)(withRouter(Detail));
