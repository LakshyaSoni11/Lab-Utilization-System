export const registerUser = async (req, res) => {
    try {
      const { name, email, password, roleId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({ name, email, password: hashedPassword, roleId });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Login a user
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user.userId, role: user.roleId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };