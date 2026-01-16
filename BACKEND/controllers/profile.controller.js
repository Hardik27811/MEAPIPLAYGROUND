const Profile = require('../models/Profile.model')



exports.getProfiles = async (req,res)=>{
    try {
        const profile = await Profile.find()
                        .populate('User' , 'name email')
        if(!profile){
            return res.status(404).json({
                message : 'Not anything to show '
            })
        }
        res.status(200).json({
            sucess : true,
            profile
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProfile = async(req,res)=>{
    try {
        const {education ,skills , projects , works , links } = req.body;
        const profile = await Profile.create({User: req.user._id,education ,skills , projects , works , links });
        res.status(201).json({
            sucess : true,
            message : "Profile Created Sucessfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProfile = async (req,res)=>{
    try {
         const updated = await Profile.findOneAndUpdate({}, req.body, {
            new: true
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}


exports.getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.params;
    const profile = await Profile.findOne({ skills: skill });
    res.json(profile?.projects || []);
  } catch (error) {
        res.status(500).json({ message: error.message });
    
  }
};

exports.getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile.skills);
  } catch (error) {
        res.status(500).json({ message: error.message });
    
  }
};


exports.searchProfile = async (req, res) => {
  try {
    const q = req.query.q;
    const profile = await Profile.findOne({
        $or: [
        { name: new RegExp(q, "i") },
        { skills: q },
        { "projects.title": new RegExp(q, "i") }
        ]
    });
    res.json(profile);
  } catch (error) {
        res.status(500).json({ message: error.message });
    
  }
};

exports.myProfile = async (req,res)=>{
    const profile = await Profile.findOne({User: req.user._id})
                                    .populate('User', 'name email')

    if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
    res.status(200).json({
        sucess : true,
        profile
    })
}
