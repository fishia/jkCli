const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'title',
                message: 'Package Name',
                default: 'React Template',
            },
        ];
        return this.prompt(prompts).then(props => {
            this.prompts = props;
        });
    }

    writing() {
        this.writeFiles({
            context: {
                name: this.name,
                ...this.prompts,
            },
            filterFiles: f => {
                return true;
            },
        });
    }
}

module.exports = Generator;
