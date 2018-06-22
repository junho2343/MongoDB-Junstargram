const fs	 = require('fs');
const multer = require('multer');
const upload = multer({"dest": "./public/product"});

module.exports = function(app,models){
	const Product = models.Product;
	const User	  = models.User;
	
	function render(req,res,page,data,tag = false){

		var param = {
			'page' : page,
			'data' : data,
			'tag' : tag
		};
		res.render("index.ejs",param);
	}

	// render main page
	app.get("/",function(req,res){
		var tag_data = [];

		Product.find(function(err,product){
			if(err) return console.log(err);

			product.forEach(function(value){
				tag_data = tag_data.concat(value.tag);
			})

			render(req,res,"./view/product/index.ejs",product,tag_data);

		})
	
	})

	//search main page
	app.post("/",function(req,res){
		var tag_data = [];
		var temp = req.body.search;
		Product.find({},{ tag: 1, _id: 0 },function(err,product){
			product.forEach(function(value){
				tag_data = tag_data.concat(value.tag);
			})
		})
		Product.find({tag: new RegExp(temp, 'i')},function(err,search){
		
			if(err) return console.log(err);
			render(req,res,"./view/product/index.ejs",search,tag_data);
		})
	})

	// render admin page
	app.get("/admin/product",function(req,res){
			render(req,res,"./view/admin/product.ejs","");

	})

	// product add
	app.post("/admin/product", upload.single('img'),function(req,res){
		if(!req.file)res.redirect("/admin/product");

		var newProduct = new Product();
		var temp 		= req.body.tag;
		var image_url	= new Date().getTime();
		
		//img url set
		var type  = req.file.mimetype.split("/")[0];
		var ext   = req.file.originalname.split(".");
		
		if(type != "image")res.redirect("/admin/product");

		ext	 	  = ext[ext.length-1];
		image_url = image_url + "." + ext;

		//product value set
		newProduct.img	= image_url;
		temp.replace(/#[^#\s,;]+/gm,function(tag){
			newProduct.tag.push(tag);
		});

		newProduct.save(function(err){if(err) return console.log(err)});
		fs.rename(req.file.path,"public/product/"+image_url,function(err){
			if(err) return console.log(err);
		});
		res.redirect("/");
	})

	//product delete
	app.get("/product/delete",function(req,res){
		// var deleteProduct = new Product();
		Product.remove({ _id:req.param('id')},function(err){if(err) return console.log(err)});
			res.redirect("/");
	})
}


