window.app_config={
	random_scenarios:false, //Option for showing scenarios in random order. Due to the limitations scenarios shuffles only on startup.
	random_choices:true, //Option for showing choices of the scenario in random order. Options being shuffled every time scenario is being opened, so we can have different order for one scenario in case if user didn't pick a choice or he is replaying the app.
	scenarios:[ //List of scenarios
		{ //Each scenario description
			img:"img/scenarios/0.jpg", //Cover image for the scenario
			label:'Your Health Data', //Label of the scenario
			trends:['pdo','pp'], //List of trends in this scenario, there're UIDs of trends. You can put any number of trends here or left the array empty (or detele it). In that case trends section of scenario will not be shown
			color:'#001965', //Color for main text and icons. Any color you want, default are "#fff" - white, and "#001965" - blue.
			bkg:'#FFBA00', //Color for the background
			text:`
				<p>With greater quantities of data collected about our lives, more and more decisions are automated. Smaller, cheaper and more connected wearables allow the collection of tons of personal health data. This enables the creation of so-called digital twins—digital health data profiles that can be used to test treatments.</p>
				<p>Who can use which data, and who has a veto on that decision? The status quo ranges from the US’s approach, storing everything it finds and generates to China's boldness in claiming partial government ownership and lack of care for ethics, and the EU’s urge to regulate ownership for its citizens.</p>
			`, //HTML text of the scenario.
			question:'How do you think our data will be used in the future?', //Question
			choices:[ //List of choices for this scenario. You can have any amount of choices, not only three
				{
					icon:'pragmatic', //This affects the icon for response in label "You chose a <type> future scenario!"
					type:'a <u>pragmatic</u>', //This is for the text of this label
					//Next 3 text names are not accurate, but I believe it's pretty clear which one is responsible for what.
					text:'Your data is automatically used to track your daily activities, but is not shared with others unless you consent.', 
					asnwer:`You can give other apps permission to share your health and fitness data to help produce better insights into your health. In some cases, there isn't even a need to share the data, such as visiting your own doctor - you simply show the doctor your phone and they can view the data.`,
					response:`Ask yourself: How might you adapt your products or services use data to be more in sync with consumer needs when and where they need it?`,
					weights:{ //List of weights for the choice. There's no need to put "imaginitive:0" here, you can left only ones that truly affect the points.
						pragmatic:3,
						aspiring:1,
						imaginitive:0,
					}
				},
				{
					icon:'aspiring',
					type:'an <u>aspiring</u>',
					text:'You can save money on your health insurance based on the amount of data you contribute to AI-driven health diagnosis algorithms.',
					asnwer:`With the ability of constant health data tracking, the number of data points has grown exponentially - meaning that data-driven diagnosis has become the norm. And to that end, the more health data you share, the better health insurance rates you receive. On the other hand, your data can also lead to increases in costs if you begin to make poor health decisions or ignore health recommendations.`,
					response:`Ask yourself: Consider how your brand could leverage technology being used in adjacent spaces tobetter cater to your consumers.`,
					weights:{
						pragmatic:2,
						aspiring:3,
						imaginitive:0,
					}
				},
				{
					icon:'imaginitive',
					type:'an <u>imaginitive</u>',
					text:`The ubiquity of everyone sharing all of their data, all of the time has resulted in a lack of available data processing power - and in order to get meaningful health results, you need to sometimes use your own brain's computing power via your brain implant.`,
					asnwer:`With the emergence of all personal health data being constantly collected via phones, wearables, and ubiquitous connected devices, highly automated healthcare decisions are made about you and your health every day, thanks to powerful algorithms that have been trained on an overabundant supply of data. It's gotten to the point where getting priority for your data to be instantly processed is difficult, leading to people using their own brainpower to help crunch data - imagine taking a break on the sofa and starting a "meditation" exercise, all with the goal of tracking your own health!`,
					weights:{
						pragmatic:0,
						aspiring:1,
						imaginitive:3,
					}
				},
			]
		}, //Scenario ends.
		{
			img:"img/scenarios/1.jpg",
			label:'Going Digital',
			trends:['sm','dd'],
			color:'white',
			bkg:'#12A9A0',
			text:`
				<p>We are starting to see how AI can be used to create media featuring artificially rendered humans, such as deepfakes. We are moving into an age of abundant possibilities, from story-telling to hyper-personalized media. The question we are facing is no longer what is real, but if we will even care.</p>
				<p>Generational friction has always been a source of innovation and change. As new generations are staking their claim and defining their world-view, markets have to adapt. What will happen when the generation that has grown up with ubiquitous digital tools and services - living their lives digitally by default - moves to the center of attention in the healthcare market?</p>
			`,
			question:'How digital will your life be in 2035?',
			choices:[
				{
					icon:'pragmatic',
					type:'a <u>pragmatic</u>',
					text:'You are more likely to seek health advice from social media channels or AI-enhanced digital avatars than visiting your doctor.',
					asnwer:`Constant health data tracking and AI-based diagnosis are linked with a digital-first generation demanding new gadgets and apps to manage mental and physical health. A preventive care system, independent of medical providers, means that a fitness tracker might know more about the health of the person wearing it than their physician.`,
					response:`Ask yourself: How could your company adopt Gen Z-inspired services?`,
					weights:{
						pragmatic:3,
						aspiring:2,
						imaginitive:1,
					}
				},
				{
					icon:'aspiring',
					type:'an <u>aspiring</u>',
					text:'Your doctor has been replaced by a digital health assistant avatar - a real human doctor only steps in when the digital assistant asks them to.',
					asnwer:`In this future, the majority of people are willing to exchange the benefit of speaking with a real human for the possibility of an instant, hyper-personalized digital human avatar - a healthcare professional that is personalized to your language, needs, and mindset.`,
					response:`Ask yourself: How might your business be impacted by deepfake technology?`,
					weights:{
						pragmatic:1,
						aspiring:3,
						imaginitive:0,
					}
				},
				{
					icon:'imaginitive',
					type:'an <u>imaginitive</u>',
					text:`Doctors don't exist anymore - your health is monitored via a digital health assistant that acts as your best friend and tweaks the many micro-sized sensors implanted in your body to respond to your health needs.`,
					asnwer:`Developments in internal (nano) sensors and AI have combined to provide not only constant, comprehensive health monitoring, but can also make automatic health adjustments, maintaining balance and pre-emptively striking against any developing medical conditions. In this future, micro-sensors can tweak your brain's motivational receptors - urging healthy eating and exercise habits.`,
					response:`Ask yourself: How could your business area incorporate mixed reality and IoT into its customer journey?`,
					weights:{
						pragmatic:0,
						aspiring:1,
						imaginitive:3,
					}
				},
			]
		},
		{
			img:"img/scenarios/2.jpg",
			label:'Receiving Care',
			trends:['ai','mh'],
			color:'white',
			bkg: '#005AD2',
			text:`
				<p>AI in healthcare has arrived at a level that enables better diagnoses based on big data and new tools in predictive healthcare. It is speeding up drug development, and the proliferation of devices that track every aspect of our life has created so-called digital twins. Big Tech has also successfully monopolized these data sources.</p>
				<p>At the same time, we are seeing an unbundling of healthcare that used to be pooled around providers like hospitals. Technologies like telemedicine offer patient-centric services that can be more personalized and empowering. Instead of one provider (GP or hospital) making all the decisions, the patient can choose between different providers for different aspects of the care they receive.</p>
			`,
			question:'How do you think healthcare will look like in 2035?',
			choices:[
				{
					icon:'pragmatic',
					type:'a <u>pragmatic</u>',
					text:'More companies are using machine learning to score your risk level for a needed treatment through apps and websites instead of relying solely on the decision of your doctor.',
					asnwer:`Health care's standard operating model relies on an interconnected network of telemedicine services, online pharmacies, and virtual clinics - all going through patented AI diagnosis algorithms. In this scenario, your doctor may be the last person you consult about your health - especially with new apps and services that are able to respond to you at any time of the day, with instant results and recommendations.`,
					response:`Ask yourself: Consider how you could leverage developments in AI to improve the experience of your customers.`,
					weights:{
						pragmatic:3,
						aspiring:0,
						imaginitive:0,
					}
				},
				{
					icon:'aspiring',
					type:'an <u>aspiring</u>',
					text:'The sensors in your car determine your vital signs and compare them to health data collected from your other devices in order to provide targeted health recommendations - all while you drive to work.',
					asnwer:`AI-driven health platforms offer unprecedented personalization and always-on accessibility. The power of data collection and prediction has moved healthcare from reaction to prevention, with healthcare advice being available at any moment, appearing in a manner (calm or energizing) that’s helpful for the situation, like instructions on how to take medicine, a pre-test before an appointment, recommendations to alleviate a current symptom, and more. You might even see your vehicle outfitted with specialised medical equipment, making your autonomous car work as an on-call ambulance that can drive off while you're at work and assist someone in an emergency.`,
					response:`Ask yourself: Where is AI encroaching in your industry and how are you planning to embrace and adapt to that?`,
					weights:{
						pragmatic:1,
						aspiring:3,
						imaginitive:2,
					}
				},
				{
					icon:'imaginitive',
					type:'an <u>imaginitive</u>',
					text:`A drone delivery shows up at your door and says that you need to take a certain medication or else a pre-diagnosed health condition will worsen.`,
					asnwer:`By harnessing the power of data collection and prediction, healthcare is moving from reaction to prevention, providing users with not just peace of mind, but also saving them potentially tens of thousands of dollars in medical expenses. That shift - from trying to cure medical issues to preventing them from happening in the first place - is one of the most important and exciting developments in the history of modern medicine, according to the owner of one large technology company.  What happens in this scenario if you choose to not take the medication? Does you virtual assistant report your decision to your health insurance provider, resulting in higher health insurance premiums?`,
					response:`Ask yourself: What values will govern the future use of AI at your company?`,
					weights:{
						pragmatic:1,
						aspiring:1,
						imaginitive:3,
					}
				},
			]
		}
	], //List of trends.
	trends:[
		{
			uid:'ai', //Each trend has its own UID, this UID needed for scenarios to show small trends sections in their description.
			label:'AI-Driven Healthcare', //Label
			img:'img/trends/iStock-1050311604_edit.jpg', //Image
			text:`
			<h3>Context</h3>
			<p>AI in healthcare has arrived at a level that enables better diagnoses based on big data and allows for new tools in predictive healthcare. It is speeding up drug development. Silicon Valley giants see healthcare as a profitable application for their AI-investments. Many pharma players lean on their expertise because they lack both the technology and the data. Additionally, the proliferation of devices that track every aspect of our life has created so-called digital twins. Big Tech has successfully monopolized those data sources.</p>
			<h3>Signals</h3>
			<p>Compared with radiologists from the US, Google’s DeepMind’s AI system reduced false-positive rates (when an image is falsely identified as abnormal) by nearly 6 percent and false-negative rates (when cancer is missed) by over 9 percent.<a target="blank" href="https://www.nature.com/articles/s41586-019-1799-6">(Link)</a> An AI-created drug is about to be used on humans for the first time after just 12 months of development. (It usually takes about five years to develop a drug for human use.)<a target="blank" href="https://www.bbc.com/news/technology-51315462">(Link)</a> Gut microbes, with the help of AI, can now reveal the perfect diet.<a target="blank" href="https://thespoon.tech/viomes-cto-on-why-gut-microbes-plus-ai-can-reveal-perfect-diet/">(Link)</a> Apple is not building health-related features into its consumer products; their ultimate goal is to create a HealthOS.<a target="blank" href="https://divinations.substack.com/p/healthos">(Link)</a> Novartis has brought Microsoft on board to provide AI-capabilities to every employee, which means that Novartis’ research data will be processed on Microsoft’s infrastructure.<a target="blank" href="https://dailyalts.com/artificial-intelligence-novartis-and-microsoft-team-up-to-transform-global-medicine/">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>AI will change the way practitioners work through tele-/ remote diagnosis, partial replacement of diagnosis, and individual drug development for patients. AI is one of the essential tech healthcare trends, which influences most other trends. But its success will also be based on tech companies’ ability to deal with the growing evidence of biases in algorithms that may lead to false results. AI will need to lose its black-box status and become more transparent for patients and doctors to trust its diagnoses and advice. Solving trust issues will make consumers more willing to share their data through a variety of new health-related devices.</p>`//Trend text with HTML markup for links, headers and etc.
		},
		{
			uid:'cg',
			label:'Consumerized Genomics',
			img:'img/trends/iStock-587805514_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Below the radar, there’s a groundswell of new scientific areas that are born of combing different fields to discover new routes to innovations. Synthetic biology takes inspiration and insights from engineering, design, and computer sciences to create living organisms that don’t already exist in nature. This allows for new approaches to a lot of old problems. In nanotechnology, instead of trying to shrink technology to the molecular level, you create it directly out of DNA. That’s just one example of the many new opportunities that have opened up.</p>
			<h3>Signals</h3>
			<p>The Human Genome Project was a milestone in scientific discovery. Now, scientists have started a new one. Where the last one was focused on “reading,” i.e., understanding the human genome, now the goal is to “writing.”<a target="blank" href="https://www.wired.co.uk/article/human-genome-synthesise-dna">(Link)</a> 9 CRISPR-Cas9 is one of the most promising (and highly debated) gene-editing technologies that could revolutionize many fields within medicine and healthcare. Just recently, scientists have used CRISPR and patient-derived stem cells to reverse diabetes.<a target="blank" href="https://www.fiercebiotech.com/research/reversing-diabetes-by-applying-crispr-to-patient-derived-stem-cells">(Link)</a> Other scientists have created Molecular Robots, little bits of DNA, that can collect specific molecules and deliver them to specific places.<a target="blank" href="https://www.caltech.edu/about/news/sorting-molecules-dna-robots-79640">(Link)</a> Nanotechnology has envisioned this concept for a long time.</p>
			<h3>Hypothesis</h3>
			<p>Often overlooked in the hype around digital technologies emerging from Silicon Valley, the scientific advances in the field of synthetic biology might make for the most significant changes in healthcare and health in general over the next 15 years. If synthetic biology delivers most of its currently anticipated potential, other trends like AI, unbundled healthcare, and brain-hacking will have dramatically different trajectories.</p>`,
		},
		{
			uid:'vbhs',
			label:'Value-Based Healthcare Shift',
			img:'img/trends/iStock-682517298_edit.jpg',
			text:`
				<h3>Context</h3>
				<p>Most business models of our current healthcare system are based on people getting sick, not people getting well. The vision of a value-based healthcare system is trying to turn this around (reward health). The broad idea is to use digital technologies to track different patient measures in their everyday lives to show how their quality of life has improved. This will fundamentally change how the healthcare industry works.</p>
				<h3>Signals</h3>
				<p>When the incentive is to have a healthier population, it leads to two approaches: personalized health and population health. One will try to find the best individual therapy and the other will identify areas of unmet need across a large group of people. A value-based healthcare system combines both. For pharma, this shift would move them away from promoting features and benefits of individual products to partnering across one or more disease states. The key is to provide real-world evidence for health and cost improvements. The Netherlands is one of a few countries already investing in outcomes-based healthcare (€70 million from 2018-2022).<a target="blank" href="https://www.government.nl/topics/quality-of-healthcare/information-on-the-quality-of-care">(Link)</a> Outcomes-based payment is used to address the US healthcare financing crisis: successful implementation of outcomes-based payment could lead to a trillion dollars of cumulative savings in the United States over the next decade.<a target="blank" href="https://healthcare.mckinsey.com/sites/default/files/the-trillion-dollar-prize.pdf">(Link)</a></p>
				<h3>Hypothesis</h3>
				<p>A value-based system is shaping up to become the most significant paradigm shift in the healthcare industry over the next ten years. Interoperability and data standardization will be critical drivers, but they might be spearheaded by the likes of Apple and their hubs for EHRs. This trend is closely connected with other trends like the un-bundled healthcare infrastructure and AI-driven healthcare, making this new system possible. Pharma’s challenge is to integrate much more into these new data infrastructures and provide clear evidence of how they add value.</p>`,
		},
		{
			uid:'pdo',
			label:'Polarization of Data Ownership',
			img:'img/trends/iStock-1185886099_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Who can use which data, and who has a veto on that decision? This concerns everyone, from Big Tech, pharma, citizens, the USA, Europe, China, the BRICS, etc. Currently, the status quo balances between the US’s approach, which simply stores everything it finds and generates, China's boldness in claiming partial government ownership and lack of care for ethics, and the EU’s urge to regulate ownership for its citizens. Blockchain, as a technological concept, tries to solve many of those issues, but concrete solutions are still scarce.</p>
			<h3>Signals</h3>
			<p>Big Tech is trying to force its data contracts on under- regulated countries. For example, Google provides its AI-based medical diagnostics to the Aravind hospital in India for free in exchange for the medical data.<a target="blank" href="https://www.linkedin.com/pulse/data-colonialism-bart-de-witte/">(Link)</a> Several developing countries refused to sign an international declaration on data flows because it caused a war on data between Big Tech and upcoming states like India, Indonesia, and South Africa.<a target="blank" href="https://www.livemint.com/news/world/india-boycotts-osaka-track-at-g20-summit-1561897592466.html">(Link)</a> China’s Social Scoring Systems is treated with criticism and fear in Western countries but enjoys high popularity among the growing Chinese middle class.<a target="blank" href="https://theconversation.com/hundreds-of-chinese-citizens-told-me-what-they-thought-about-the-controversial-social-credit-system-127467">(Link)</a> Cities can become key agents in the transition from surveillance capitalism, where data ownership is opaque, to a model where data is a common good, co-owned by all citizens. 17</p>
			<h3>Hypothesis</h3>
			<p>Data is an essential source for most digital services, including AI, which will continue to be a hot commodity. Whoever owns the data owns the future. With the growing demand for regulations, it will get harder for tech companies to harvest data without any compensation or revenue sharing.</p>
			<p>The different approaches to data ownership between the US, China, Europe, and other countries will grow further apart and create uncertainty in a complicated global system. Interoperability, both technological and political, is in decline.</p>`,
		},
		{
			uid:'hnl',
			label:'Health as the New Luxury',
			img:'img/trends/iStock-1127195576_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>The positive correlation between per capita income and health is one of the best-known in international development. Health has become a primary way to display wealth and show richness without showing off. There is a growing dichotomy between hyper- individualized health solutions for a wealthy minority and a majority suffering because it can barely afford most health care services.</p>
			<h3>Signals</h3>
			<p>Expansive fitness platforms are adding AI algorithms: “[offering] the only truly intelligent, custom adaptive- training solution on the market.”<a target="blank" href="https://www.mobihealthnews.com/news/digital-fitness-company-pear-sports-buys-ai-enabled-health-coach-performance-lab">(Link)</a></p>
			<br>
			<p>According to the documentary “Feel Rich”, the hip-hop industry takes health and wealth seriously. Rappers as social climbers celebrate their opportunity to live a healthy life now.<a target="blank" href="https://www.vibe.com/2017/05/feel-rich-health-is-the-new-wealth-documentary">(Link)</a> The millennial luxury traveler is more interested in wellness than ever before.<a target="blank" href="https://bocaterry.com/blog/beyond-luxury-how-wellness-is-transforming-hospitality/">(Link)</a> Developing a whole new set of multi-sensory experiences is transforming the hospitality industry. #GoFundMe Healthcare: People have to tell extremely emotional, heartbreaking stories to collect money from their friends to pay for expensive but necessary treatments.<a target="blank" href="https://www.newyorker.com/magazine/2019/07/01/the-perverse-logic-of-gofundme-health-care">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>Wealthy customers will continue to push for more exclusive services to live longer and healthier lives. A positive outcome would be if these developments deliver better healthcare for the general population. But the danger is that it will foster a more distinctive two-class system between those who can afford the very best healthcare and those who cannot. Patients without access to or a lousy ranking in public healthcare system could flock to home-brewed synthetic drugs and CRISPR kits­—with unintended consequences.</p>`
		},
		{
			uid:'mh',
			label:'Modular Healthcare',
			img:'img/trends/iStock-1062130136_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Digital approaches allow for an unbundling of healthcare that used to be pooled around providers like hospitals. Technologies like telemedicine and distributed triage offer patient-centric services that can be more personalized and empower the patient. Instead of channeling all patients through the same process (of a hospital, for example), diagnoses for minor symptoms can be conducted virtually, thus keeping the emergency room free for the urgent cases. Instead of one provider (GP or hospital) making all the decisions, the patient can choose between different providers for different aspects of the service line.</p>
			<h3>Signals</h3>
			<p>Infermedia<a target="blank" href="https://infermedica.com/">(Link)</a> is one of the new tech startups offering healthcare providers a way to pre-diagnose, triage, and direct patients to appropriate medical services with the help of chatbots, apps, and AI., reducing the significance of GPs and moving the point of decision to insurance companies, for example. The COVID-19 pandemic has been an enormous accelerator for this unbundling trend. In particular, the use of telemedicine to avoid in-patient care sky-rocketed.<a target="blank" href="https://www.fastcompany.com/90505924/telehealths-future-is-bright-heres-what-itll-look-like-in-2025">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>Now that far more patients are been accustomed to telemedicine due to the COVID-19 pandemic, this trend is expected to only accelerate further into a widely distributed healthcare system with unbundled care services, especially when combined with other trends like AI.</p>
			<p>Thinking about the longer term: there’s a new development of “re-bundling,” for example in TV shows. And with central platforms like Apple Health, we also are getting the first glimpse of this happening for healthcare in the future, which opens up the question: What will become the new hub for healthcare? New InsureTech startups like Elma<a target="blank" href="https://elma.care/">(Link)</a> position themselves more as a healthcare company, not as insurance, and their focus is really on optimizing healthcare and taking care of people.</p>`
		},
		{
			uid:'ct',
			label:'A Crisis of Trust',
			img:'img/trends/iStock-533295841_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Fake news has often been blamed for the rise of populism and the spread of conspiracy theories, but the root of the problem goes much deeper. Polarization has increased dramatically due to a connection with identity. People interpret the world according to the world-view of their “tribe,” not facts or rational thoughts. And with this behavior comes a zero-sum/us-vs-them thinking in which compromise is considered a loss. Advances in detecting and flagging fake news are being made but so far fall short of making an impact.</p>
			<h3>Signals</h3>
			<p>The genuine danger in conspiracy theories can be observed in the anti-vaccination movement, where a long-debunked study has led to an ongoing campaign all over the world that directly impacts healthcare and the fight against disease.<a target="blank" href="https://www.nature.com/articles/d41586-020-01423-4">(Link)</a> The prevalence of this movement, especially within well-educated groups of society, is harrowing. The current backlash against 5G (burning of cell towers,<a target="blank" href="https://www.cnet.com/health/5g-coronavirus-conspiracy-theory-sees-77-mobile-towers-burned-report-says/">(Link)</a> etc.) shows how another health-related conspiracy theory can directly influence the future of essential technology for digital healthcare. These can no longer be considered fringe views whilst populist leaders continue to preach on these topics.</p>
			<h3>Hypothesis</h3>
			<p>Any new cure, vaccine, diagnosis tool, or other health- care technology is in danger of triggering a public backlash and polarization. Pharma companies will have to face a public debate in which scientific facts play a declining role, and a healthcare conversation in which fringe theories become mainstream. How do you develop and market drugs when a growing group in society doesn’t trust you anymore, no matter what you tell them?</p>
			<p>The hope that populist leaders and the proponents of conspiracy theories will debunk themselves has not worked out so far. So players in the healthcare industry will have to make this trend an essential driver in all plans for the future—at least as long as no solution is feasible or the trend is not declining.</p>`
		},
		{ 
			uid:'nph',
			label:'New Players in Healthcare',
			img:'img/trends/iStock-1168468349_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>While obvious players like pharma, insurance companies, and many other providers and payers fight about future shares of the healthcare market, some new players are emerging. With them, they bring the potential to shake up the industry from new and unexpected positions.</p>
			<h3>Signals</h3>
			<p>While Amazon changed consumer shopping habits, Walmart adopted new solutions for its customers’ needs—like integrating outpatient healthcare services.<a target="blank" href="https://www.forbes.com/sites/brucejapsen/2019/09/13/walmarts-first-healthcare-services-super-center-opens/">(Link)</a>  Best Buy is focusing its future on digital-health initiatives, moving from selling devices to adding analytics and services to helping seniors grow old, for example, with the help of their trusted customer-service workforce.<a target="blank" href="https://www.digitalcommerce360.com/2019/09/30/best-buy-targets-five-million-seniors-for-digital-health-services/">(Link)</a>  Venture capital firms are cooperating to create a technology security certification for digital healthcare because this regularly makes the difference between life and death for their startups.<a target="blank" href="https://techcrunch.com/2019/12/10/healthcare-focused-venture-firms-are-forming-a-best-practices-group-for-securing-health-data/">(Link)</a> Group Purchasing Organizations (GPO) are helping increase competition, transparency, and even emergency preparedness;<a target="blank" href="https://revcycleintelligence.com/news/group-purchasing-reduces-healthcare-supply-chain-costs-by-13">(Link)</a> they are an archetype for new partnerships. Governments are moving the needle by introducing pricing controls on pharmaceuticals and medical technology devices.<a target="blank" href="https://www2.deloitte.com/bs/en/pages/life-sciences-and-healthcare/articles/global-health-care-sector-outlook.html">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>The healthcare market is becoming more fragmented and thus much harder to observe. New players from unexpected fields are entering it to disrupt. Pharma, with its current focus on research and manufacturing, is in danger of being pushed to the fringes of the network as a provider of intel and a receiver of fulfillment orders. Others like insurance companies or Big Tech are trying to become the central platforms that steer the integrated systems of future healthcare. But there are always new possibilities in the shake-up of an existing landscape. Why let new players be the only ones to disrupt when old players can do the same, reinventing their role in the changing system?</p>`
		},
		{
			uid:'dd',
			label:'Digital by Default',
			img:'img/trends/iStock-986655580_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Friction between generations has always been a source of innovation and change. As new generations like millennials and Generation Z are staking their claim and defining their world-view, markets have to adapt. Young people around the globe are living their lives digitally by default.</p>
			<p>What will happen when the generation that has grown up with all those digital tools and services moves to the center of attention in the healthcare market?</p>
			<h3>Signals</h3>
			<p>Young people in their teens and twenties are already used to a more holistic lifestyle with a focus on mental health. They are familiar with meditation, intermittent fasting, and all the diets from paleo to vegan. They can’t imagine dating some who hasn’t been to therapy. They manage their health completely digitally. Every non-digital interaction with providers and insurance companies feels like an unnecessary drag. Authenticity, purpose, sustainability, and diversity—they expect a lot from brands that want to cater to them, and they can rally the troops quickly if they feel burned. From AI-based astrology to biohacking—they are open to fringe (mental) healthcare movements, but often their meme-based approach to new things is indistinguishable from trolling.<a target="blank" href="https://www.thefuturelaboratory.com/future-forecast-2019-report">(Link)</a> <a target="blank" href="https://www.fiercehealthcare.com/practices/industry-voices-generation-z-a-game-changer-for-healthcare">(Link)</a> <a target="blank" href="https://time.com/collection/davos-2020-mental-health/5764680/mental-health-at-work/">(Link)</a> <a target="blank" href="https://medcitynews.com/2019/10/5-ways-millennials-and-gen-z-are-revolutionizing-the-healthcare-industry/">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>Technologies change and so does their users' behavior. The healthcare industry will need to adapt to the world-view and needs of new generations. The next generations are much less willing to accept the status quo. If push comes to shove, they’ll start their own thing instead. But simply developing an app for everything won't solve the problem. These digital-first generations are also the most critical of the downsides of the digital world. But this challenge also provides an opportunity for those who do it right. And that usually means building the future with them instead of for them.</p>`
		},
		{
			uid:'pp',
			label:'Pervasive Profiling',
			img:'img/trends/iStock-1220397859_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>The finance industry has been using credit scoring for decades. With greater quantities of data collected about our lives, more and more decisions are automated with the help of scoring. Smaller, cheaper, and more connected wearables allow the collection of tons of personal health data. This enables the creation of so-called digital twins—digital health data profiles that can be used to test treatments.</p>
			<h3>Signals</h3>
			<p>China is establishing a society-wide social credit scoring. More than 33 million companies in China have been given a score, and many companies have already been blacklisted.<a target="blank" href="https://nhglobalpartners.com/chinas-social-credit-system-explained/">(Link)</a> China also exports this system to other countries via its Belts & Roads initiative. Hangzhou plans to turn their COVID-19 app into a permanent health tracker: The city’s health commission said the proposed system would be a “firewall to enhance people’s health and immunity” after the pandemic.<a target="blank" href="https://www.theguardian.com/world/2020/may/26/chinese-city-plans-to-turn-coronavirus-app-into-permanent-health-tracker">(Link)</a>  One example of a scoring company that many have been unknowingly exposed to is Zeta Global,<a target="blank" href="https://www.wsj.com/articles/marketing-software-firm-zeta-global-eyes-ipoonce-again-11583348234">(Link)</a> which scores on how much money individuals are likely to spend. France-based startup Sim&Cure<a target="blank" href="https://www.ansys.com/blog/will-digital-twins-improve-healthcare-real-world-counterparts">(Link)</a> has developed a patient-based digital twin for treating aneurysms. Finland’s Oura raised $28 million from Square, Google’s Gradient Ventures, and others for its smart wellness ring and is mainly used to track more in-depth sleep data.<a target="blank" href="https://tech.eu/brief/oura-funding/">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>We are already moving into the direction of behavioral and biometric scoring. Healthcare insurance, combined with social scoring is possible. This is another trend where regulation will have a considerable influence on the outcome over the next ten years. Future tech will track even more health data with, for example, internal (nano) sensors and AI. But there are many open questions like centralization vs. decentralization, competition vs. collaboration, and data ownership. This is why Blockchain technologies provide a lot of potential in this space.</p>`
		},
		{
			uid:'sm',
			label:'Synthetic Media',
			img:'img/trends/iStock-1185757798_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>Human to human interaction is the pinnacle of communication. New AI technologies allow the generation of media featuring artificially rendered humans. Deepfakes have been the most prominent example in this field. We are moving into an age of abundant possibilities, from story-telling to hyper- personalized media. This trend is already changing processes and business models in the media industry and will spill over into other industries soon. The question we are facing is no longer what is real, but if we will even care.</p>
			<h3>Signals</h3>
			<p>Synthesia creates original videos with personalized and localized messages, using human-like avatars with correct facial expressions.<a target="blank" href="https://www.synthesia.io/">(Link)</a>  This allows, for example, to produce translated promotion or training videos automatically. Voicery uses its AI-driven text- to-speech technology to create individual, natural- sounding voices for organizations that then can speak any give text.<a target="blank" href="https://www.voicery.com/">(Link)</a> They offer specific speech engines for different contexts, from call centers to audiobooks, to adapt the voices. Samsung's Star Lab was the viral hit of CES 2020, with the NEON concept developing full-person real-time avatars with which to have conversations.<a target="blank" href="https://www.youtube.com/watch?v=Q6f6EXX-79w">(Link)</a> One of the presented avatars was a doctor.</p>
			<h3>Hypothesis</h3>
			<p>A lot of conversations in the context of healthcare are deeply personal and are based on human to human interaction. But what if healthcare professionals could be available at any moment, speaking your language, appearing in a manner (calm or energizing) that’s helpful for situations like instructions on how to take medicine, a pretest before an appointment, personal training for post-surgery recovery, etc. How far are people willing to let go of speaking with a human for the possibility of an instant, hyper-personalized human- like avatar? And for which context first?</p>`
		},
		{
			uid:'odsc',
			label:'On-Demand Supply Chains',
			img:'img/trends/AdobeStock_268055096_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>The rise of everything on-demand has put a lot more emphasis on supply chains to deliver on this promise. Logistics are getting unbundled and disrupted by new players and technologies, from drones to 3D printing and, of course, AI. Everything is becoming faster and better connected. Companies need to adapt rapidly and continuously. In a digitized global economy, supply chains are no longer an afterthought of products and services but have become highly contested sources of power and influence.</p>
			<h3>Signals</h3>
			<p>No other company understands the future of logistics like Amazon. From their aircraft fleet and their drone program to same-day delivery—they anticipate the wishes of the modern consumer and the supply chains needed to fulfill these. UPS and Matternet have begun delivering medical supplies via drone at UC San Diego Health.<a target="blank" href="https://mttr.net/">(Link)</a>  Drone usage has also seen a sharp uptick during the COVID-19 pandemic.<a target="blank" href="https://www.geospatialworld.net/blogs/how-drones-are-being-used-to-combat-covid-19/">(Link)</a> 3D printing is becoming an essential part of maintaining a devilry fleet, as Ford has shown by reducing both the time and cost associated with the production of parts.<a target="blank" href="https://truckandfleetme.com/news/ford-goes-nuts-for-3d-printing/">(Link)</a> IBM, Merck, and Walmart have successfully finished an FDA-backed drug-tracing pilot based on Blockchain technologies.<a target="blank" href="https://www.coindesk.com/ibm-merck-declare-fda-backed-drug-tracing-blockchain-a-success">(Link)</a> The system could track drug movements while also limiting the flow of private information and, most critically, work across partners that don’t otherwise interact.</p>
			<h3>Hypothesis</h3>
			<p>Idle autonomous cars could make in-city delivery even faster, and new technologies like 5G and edge computing will play a massive role in this area. But with the growing importance of supply chains also come more significant challenges as the chains are easily affected by global crises like pandemics and the consequences of climate change. Supply chains will have to become more resilient. Customers, on the other hand, are going to request far more information about the products they purchase. Technologies like Blockchain promise to provide transparency (for both B2B and B2C) while managing the growing complexity.</p>`
		},
		{
			uid:'eg',
			label:'The End of Globalization',
			img:'img/trends/iStock-182859759_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>The globalized world economy used to consist largely of Western countries organized around the US, but that order is increasingly in disarray. While the US’s role is declining, other countries like China and India are moving into the nascent vacuum. The organizing principle of globalization used to be close coordination and collaboration. But growing uncertainty has driven a lot of countries to put their national interests first. They are no longer willing to have the rules dictated by the big ones. The global economy is becoming more fragmented and complex.</p>
			<h3>Signals</h3>
			<p>The ongoing trade disagreements between the US and China and their tax penalties have been a primary source of uncertainty. Both governments have also used economic pressure for their political interests. Trade agreements, in general, have faced backlashes around the world. But there are also more fundamental structural changes in globalization like the trade in services growing much faster than the one in goods. Labor-cost arbitrage has become a minor factor compared to knowledge for global value chains.<a target="blank" href="https://www.mckinsey.com/featured-insights/innovation-and-growth/globalization-in-transition-the-future-of-trade-and-value-chains">(Link)</a> The COVID-19 pandemic has accelerated a lot of the deglobalization developments. Countries raced to close borders for medical supplies and are trying to lock in companies developing a vaccine. There was almost no globally coordinated response to the crisis.<a target="blank" href="https://www.nytimes.com/2020/04/16/upshot/world-economy-restructuring-coronavirus.html">(Link)</a></p>
			<h3>Hypothesis</h3>
			<p>Countries will try to become less dependent on other countries for economic reasons or resilience in global crises. This trend is also closely connected to other developments like growing nationalism and populism. The global economy in 15 years could look very different from now. The world during the COVID-19 pandemic can be taken as a possible scenario of what lies ahead. Uncertainty is the most significant factor, and governments will try to fight it by shaping their contexts in their favor.</p>`
		},
		{
			uid:'nsi',
			label:'New Sustainable Innovators',
			img:'img/trends/iStock-1226294027_edit.jpg',
			text:`
			<h3>Context</h3>
			<p>First, Second and Third World countries—this categorization is losing its footing as countries in the second and third tier are no longer willing to accept the hegemony by the First World that is based on aid and economic development. They want to grow more independent and coordinate eye-to-eye (“cooperation”—not “aid’). Instead of being customers for generic products, they would rather be partners for developing local sustainable solutions.</p>
			<h3>Signals</h3>
			<p>The health ministers of Brazil, Russia, India, China, and South Africa (BRICS) intensified the coordination of their activities, and BRICS’ New Development Bank is providing funding for local health initiative in the member countries.<a target="blank" href="https://www.thehindu.com/news/national/coronavirus-brics-new-development-bank-provides-1-billion-loan-to-india-to-fight-covid-19/article31575452.ece">(Link)</a> Banks like HSBC have set up regional startup accelerators with the help of local partners to cater to a community of social entrepreneurs in the Middle East.<a target="blank" href="https://www.arabnews.com/node/1572946/corporate-news">(Link)</a> The EU introduced a new Africa strategy aimed at partnership instead of tutelage.<a target="blank" href="https://ec.europa.eu/international-partnerships/system/files/communication-eu-africa-strategy-join-2020-4-final_en.pdf">(Link)</a> Accepting Africa’s new role is crucial to counter outside influences on the continent. There’s even substantial talk about debt cancellation.</p>
			<h3>Hypothesis</h3>
			<p>Former Second and Third World countries are developing a much more self-confidence. Companies wanting to operate in these countries will need to adapt to this and face more competition when these countries try to protect and foster their local companies. They will set up more local cooperations with the help of accelerator programs, joint ventures, and partner networks, instead of using brute force to insert themselves into a market as the “savior.”</p>`,
		},
	],
	//Data for a result page
	results:{
		pragmatic:{
			label:'You are a pragmatic futurist!',
			img:'img/results/pragmatic.jpg',
			text:'Pragmatic futurists seek to facilitate the emergence of collective consensus on preferred futures, and to guide groups, actively or passively, toward some at least partly democratic-preferred vision. Such individuals value social dialog and cooperation as much or more than competition and individual action. Mediators, facilitators, and visioning consultants are an important example of professional futurists who are also consensus-driven futurists, as are, at a less conscious level, managers and line workers who value the process of discovering group- and socially-preferred futures, as well as carrying out agendas. This type of professional futurism requires empathy and skill in cooperative process, the ability to articulate a range of individual visions, and it occurs most frequently in well-educated, tolerant, democratic cultures. Many socially-responsible corporations and international and nongovernmental organizations engage in this type of futurism, and highly valuable foresight methods like Delphi and prediction markets empower this type of futurism, which is helpful in our rapidly globalizing world. Consensus sometimes comes at the cost of individual or organizational excellence, but facilitating its emergence, in a way that protects innovation and variation, is essential to any serious foresight development process.'
		},
		aspiring:{
			label:'You are an aspiring futurist!',
			img:'img/results/aspiring.jpg',
			text:'Predictive futurists seek to understand and forecast what is probable and predictable about personal, organizational, national, global, and universal futures, either as a result of anticipated collective personal and social preferences (e.g., a political pollster, operating on short predictive timeframes with a verifiable degree of accuracy and margin of error), or for autonomous processes, independent of alternative possibilities of human choice (e.g., the rate of technological change accelerating measurably on average across a planet, once it has electricity, or socialist democracy, or other attractor), or both. Methodologies range from the personal and qualitative predictions of pop futurists all the way to scientific theory, formal models, data-backed analysis, logic, and empiricism. The best predictive futurism requires a strong undergraduate education in science, and a respect for scientific method as a predictive way of knowing, one less subjective than culturally relative social discourse and nonscientific (non-"natural") philosophy. Predictive work is particularly challenging, falsifiable, and specific, and it is underutilized in most futures organizations. It was pioneered by some of the founding institutions of the futures studies field (RAND, SRI, etc.) but has yet to reach its full potential. Technology roadmappers, who extrapolate technological futures from historical trends and recent developments in science, are an important new example of this type. Emerging theories of STEM compression and other mechanisms of accelerating change are another. Other predictive futurists, though many do not identify themselves as such, include most scientists, forecasters, actuaries, underwriters, investment managers, systems modelers, and operations researchers, as well as those foresight consultants, business, political, legal, social, and personal futurists who engage in prediction. Improving the predictive social science methods of futures work (forecasting, modeling, hypothesis testing, statistics, measurement) will be critical to advancing the status of futures studies programs in coming years. As with other types of futuring, improvement in each level can be aided by the development of higher levels of futurism as well.'
		},
		imaginitive:{
			label:'You are an imaginative futurist!',
			img:'img/results/imaginative.jpg',
			text:'Imaginative futurists envision the future in a way that includes a mature understanding of the perspectives and conventions of others. They will also occasionally subvert, reinterpret, or break those conventions as well, sometimes with highly valuable results. After developing a healthy (and mostly preconventional) ego, and learning how to solve personal problems (at least enough to stay alive) gaining a broad world model and a healthy, active imagination is next most foundational skill for all futurists. Do you have an extensive understanding of the values, norms, and conventions of others? Can you usefully break them? Can you imagine justifiable exceptions to every rule? Can you envision personal, organizational, national, and global futures? Imaginative foresight, aided by hindsight and insight, is one of the most valuable and practical mental habits we can develop. The better our imagination, the better our ability to envision. Futurists do themselves a favor by reading as their primary method of gaining information, because reading aids the development of high quality, personalized, and imaginative mental constructs, based on minimal and efficient symbolic input. Visual symbolism is also important, but it must be accompanied by demanding imaginative work, or it builds only a surface-level visioning capacity. Serious futurists recognize the importance of reading extensively and selectively.'
		},
	}
}

/*
About the points, actually you can create as many different "results" type as you want, but be sure that you added new data into weights of the choices, .e.g:

weight:{
	...
	optimistic:3
}

and to the results page section, with the same name:

results:{
	...
	optimistic:{
		label:"...",
		img:"...",
		text:"..."
	},
}

Also you may need to add different types of icons for responses. In that case you should change "type" of the choice and also add an icon into the list on main.js on line 198 (section "_future_icons", list "_icons"). It's done in this way because I have to be able to change color of icons.
*/
