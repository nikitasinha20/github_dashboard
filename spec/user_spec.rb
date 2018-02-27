describe User do 
    context “When creating user from omniauth” do 
       
       it "If user not exist, user count should increase by 1" do 
          hw = HelloWorld.new 
          message = hw.say_hello 
          expect(message).to eq "Hello World!" 
       end
       
    end 
 end
 