import './image-uploader-wrap.less';
import React, { Component } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import FileInput from 'react-fine-uploader/file-input';
import ProgressBar from 'react-fine-uploader/progress-bar';
import Spinner from 'react-spinkit';

const imageUploaderUrl = '/api/image';


const validateFile = (fileName, fileSize) => {

	if (!/^.*\.(jpg|gif|png)$/i.test(fileName)) {
		return {
			fileName, msg: `Файлы такого типа мы не поддерживаем. 
		Попробуйте загрузить другую картинку.`};
	}
	if (fileSize > 10000000) {
		return { fileName, msg: `Мы не поддердживаем файлы более10 мб.` };
	}

	return null;
}

const uploadOptions = {
	options: {
		inputName: 'imageFiles',
		request: {
			endpoint: imageUploaderUrl
		},
		validation: {
			/*allowedExtensions: ['jpeg', 'jpg', 'png'],
			itemLimit: 10,
			sizeLimit: 20000000 // 20 MBytes*/
		},
		callbacks: {
			onComplete: () => {
				console.log('completed')
			},
			onValidateBatch: (files) => {
				const errors = [];
				if (files.length > 10) {
					errors.push('Можно загрузить не более 10 файлов.')
				}
				files.forEach((file) => {
					const error = validateFile(file.name, file.size);
					if (error) {
						errors.push(error);
					}
				});
				if (errors.length > 0) {
					alert(JSON.stringify(errors));
				}

				return errors.length === 0;
			}
		}
	}
}
const uploader = new FineUploaderTraditional(uploadOptions);

const fileInputChildren = <span>Choose files</span>

export const Thumbnail = (props) => {
	const {
		imageId
	} = props;

	const imgUrl = `${imageUploaderUrl}?itemId=${imageId}`;
	return (
		<div className='thumbnail-wrap'>
			<img src={imgUrl} />
		</div>
	)
}

export const ImageUploaderWrap = (props) => {
	const {
		images,
		addImageId,
	} = props;

	return (
			<FileListener {...props} />
	)
};

class FileListener extends Component {
	constructor(props) {
		super(props);

		this.state = {
			submittedFiles: [],
			status:'uploaded',
		}
	}

	componentDidMount() {
		uploader.on('progress',(a)=>{
			console.log('progress');
			console.log(a);
		});

		uploader.on('upload', (id) => {
			this.setState({status:'uploading'})
		});
		
		uploader.on('submitted', (id) => {

		});

		uploader.on('complete', (a, b, c) => {
			const submittedFiles = this.state.submittedFiles;
			submittedFiles.push(c.imageId);
			this.setState({ submittedFiles, status:'uploaded' });
			if(this.props.addImageId && this.props.addImageId){
				this.props.addImageId(c.imageId);
			}
		})
	}

	render() {
		return (
			<div>
				<div>
					{
						this.state.submittedFiles.map(id => (
							<Thumbnail key={id} imageId={id} />
						))
					}
				</div>

				<div className={`upload-btn ${this.state.status}`}>
					<FileInput
						className='btn-block btn btn-primary'
						multiple
						accept='image/*' uploader={uploader}>
						{this.state.status === 'uploaded' && (<span class='icon ion-upload'>Загрузить фото</span>)}
						{this.state.status === 'uploading' && (<Spinner name="three-bounce" color="purple"/>)}
					</FileInput>
				</div>
			</div>
		)
	}
}
