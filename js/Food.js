class Food{
    constructor(){
        this.foodStock
        this.lastFed
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
        var foodStockRef = database.ref("Food");
        foodStockRef.on("value", (data)=>{
            this.foodStock = data.val();
        })
        console.log(this.foodStock)
        return this.foodStock;
    }

    updateFoodStock(){
        if (this.foodStock !== undefined){
            database.ref("/").update({
                Food: this.foodStock
            })   
        }
    }

    /*deductFood(){
        //var stocks = "Food" + foodStock;
        database.ref('/').set({
            Food: this.foodStock
        })
    }*/

    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if (this.foodStock != 0){
            for (var i = 0; i < this.foodStock; i++){
                if (i%10 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}