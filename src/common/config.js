const cloudinary_config = {
	cloud_name: 'reklamatmpm',
	api_key: '232726185926446',
	api_secret: 'HjrRTkoKxRb_goMhRWEB23-3144'
};

const facebook ={
	name:'reklamatmpm',
	id:'125542914731875',
	secret:'093a26fccff5bfc35f743d8a6f554ac3',
	callBackUrl:'http://localhost:5000/auth/facebook/callback'
}

const vk ={
	name:'reklamatmpm',
	id:'125542914731875',
	secret:'093a26fccff5bfc35f743d8a6f554ac3',
	callBackUrl:'/auth/vk/callback'
}

const line ={
	name:'reklamatmpm',
	id:'125542914731875',
	secret:'093a26fccff5bfc35f743d8a6f554ac3',
	callBackUrl:'/auth/line/callback'
}

const linkedin ={
	name:'reklamatmpm',
	id:'125542914731875',
	secret:'093a26fccff5bfc35f743d8a6f554ac3',
	callBackUrl:'/auth/linkedin/callback'
}

const google ={
	name:'reklamatmpm',
	id:'125542914731875',
	secret:'093a26fccff5bfc35f743d8a6f554ac3',
	callBackUrl:'/auth/google/callback'
}

module.exports ={
	cloudinary_config,
	vk,
	facebook,
	line,
	linkedin,
	google
}