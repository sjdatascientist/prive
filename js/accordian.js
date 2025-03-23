const accordionData = {
    set1: [
        { header: "What does Prive’drive do ?", content: "Prive’Drive is a fractional car co-ownership facilitating platform which allows the members to enjoy co-owning a premium car at a fraction of the on road price ." },
        { header: "How does this system work ?", content: "In any city, once we once there are minimum 10-12 people interested in any premium car,we are able to form a group, after verification, to co-own the car ." },
        { header: "Who will own the car ?", content: "The car will be registered in the company name , and all the members of this privileged group co-own the car as equal share holders . One member can take more than 1 membership to avail more number of days and limited to 3 memberships only." },
        { header: "What is the role of the Prive’Drive ?", content: "The main functions of the company starts with: Forming this group of privileged car owners: Facilitating and managing car allocation according to slot booking : managing the general maintenance of the car : managing parking and Chauffeur allotment : Enabling fair distribution of the car slots : Car Parking : Insurance issues : Distribution of car sale proceeds after 5 years." },
        { header: "Is this format better than renting a premium car ?", content: "The advantage of this system is as follows: The feeling of a brand new car is different in this case. Rental will be all used cars : The car is chauffeur driven and hence well maintained and clean at all times : A chauffeur driven car has a better resale value than a multi driver car. : All parking issues and car safety while parking are looked at by the chauffeur. : The car is White board and not a yellow board. : There is no branding on the car and gives feeling of private ownership to everyone. : Plus the biggest advantage is that it comes to about 5-6 times cheaper than a rental Car." }
    ],
    set2: [
        { header: "What are the charges to be paid to the company annually ?", content: "The AMC of the cars depends on the class of cars- 1.5-2.5% of the cost of the car There is a one time membership fee of 9.33% of the on road cost of the car. There is also an annual subscription fee of 0.9% of cost of on road price. These are levied to compensate for the 40 days and not 30 days in a year and hence 200 days in 5 years." },
        { header: "What is the ownership period ?", content: "The membership of this group is for 5 years and hence the co-ownership is for this period. The minimum membership is for 2 years. The car can be sold earlier than 5 years if at least 75% of the members wish for it. The decision of the company would be final in case general agreement is not reached in such a situation." },
        { header: "What about the general service , repair and maintenance charges?", content: "All these charges come under AMC" },
        { header: "What if I want to drive the car, inspite of the chauffeur being there ?", content: "Though we would not like to encourage this practice, in case you want to drive it, you would be fully responsible for the any kind of damage to the car and any kind of accident would be to your account. The charges for this action would be to your responsibility wholly." },
    ],
    set3: [
        { header: "How do I book the car which I want ?", content: "We don’t have any sort of setup fees and our booking fee is Rs 10000/- (Ten thousand only) which is adjusted in the the final payment of the membership fee of 9.33% of the on road cost of the car. This booking helps you in getting priority in your city for your membership and you also have a chance of further discount of Rs 10000/- as early bird member. Please mention the city and the car you wish to co-own." },
        { header: "When do I make the balance payments ?", content: "Whenever we have to make payment to the car dealer, after approval of your membership, we will ask you for balance of membership payment after adjusting the 10000/- plus early bird discount of 10000/- if applicable." },
    ],
    set4: [
        { header: "How do we make car usage booking ?", content: "The bookings are done first come first serve basis . One can make booking in the APP maximum of 60 days in advance and a continuous period of 10 days at a stretch so that the other members have a fairly equitable chance of usage. Cancellation of days can be done maximum 5 days in advance from the date of usage booking. Beyond this date if cancellation is done, a penalty will be levied of 2 days lost from the total allotted days in the year " },
        { header: "How many days can I use the car in a year ?", content: "Remember you are allotted 40 days in a year and 200 days in 5 years time." },
        { header: "What if someone else has booked on my days already ?", content: "The booking is done on first come first serve basis." },
        { header: "Can I carry over my leftover days to the next year ?", content: "Yes one can carry over their 3 days maximum leftover days to the next year." },
        { header: "What if I do not get the car on my booking day ?", content: "The company will try to make sure that you get some car for the usage . If the delay if due to non compliance of rules by some other members, that member would be levied a penalty of 3 days for each day of delay." },
        { header: " What if the car is not available due to repair / service on my booking days ?", content: "The company would try it best to provide an alternative car or credit that many days to your account at a later date." },
        { header: "How will I be charged for the fuel used ?", content: "You will get the car with a full tank and you are supposed to give it back with a full tank. For EV cars , if the car can be charged at your residence, it should be done before returning the car. If not possible it should returned earlier so that it can be charged at it parking place" },
        { header: "Are there any fixed hours for the Chauffeurs ?", content: "While we recommend max of 9-10 hours of duty for the chauffeurs , the extra hours if any could be paid to them as overtime charges of Rs500/hour." }
    ],
    set5: [
        { header: "Can I refer and get something back ?", content: "Yes you can refer, and if your referred party becomes a customer, you are credited with Rs 10000 and your referral party is credited with Rs5000 one time." },
    ],
    set6: [
        { header: "Can I sell my membership or transfer the membership ?", content: "Yes. The membership is saleable or transferred. The members waitlisted on the list have the first priority to claim the membership at a negotiated price between themselves. The company would help out in identifying the members. There would be a service charge by the company as documentation charges." },
    ],
    set7: [
        { header: "Can I form my own group ?", content: "Yes, you can and we encourage you to do it" },
    ],
};

function loadAccordion(set) {
    const accordion = document.getElementById("accordion");
    accordion.innerHTML = "";
    accordionData[set].forEach((item, index) => {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");

        if (index === 0) {
            accordionItem.classList.add("active");
        }
        
        const header = document.createElement("div");
        header.classList.add("accordion-header");
        header.textContent = item.header;
        
        const content = document.createElement("div");
        content.classList.add("accordion-content");
        content.innerHTML = `<p>${item.content}</p>`;
        
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        accordion.appendChild(accordionItem);

    });
    attachAccordionEvents();
}

function attachAccordionEvents() {
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function () {
            const item = this.parentElement;
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

document.querySelectorAll(".sidebar ul li").forEach(option => {
    option.addEventListener("click", function () {
        const selectedSet = this.getAttribute("data-content");
        loadAccordion(selectedSet);
    });
});

loadAccordion("set1"); // Load the first set by default

document.querySelectorAll('.sidebar li').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all list items
            document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });


const menuButton = document.getElementById('menu-btn');
const verticalNavbar = document.querySelector('.vertical-navbar');
menuButton.addEventListener('click', function() {
    verticalNavbar.classList.toggle('vertical-navbar-hidden');
});


document.querySelectorAll(".accordian-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling; // Select the next sibling (.accordian-content)
      content.style.overflow = "scroll";

    });
  });
  

  document.querySelector(".whatsapp-div").addEventListener("click", () => {
    window.location.href = "https://wa.me/+919844033345"; // Replace with your desired link
  });

  document.querySelector(".get-started-btn").addEventListener("click", () => {
    document.querySelector(".form-container").scrollIntoView({ behavior: "smooth" });
  });