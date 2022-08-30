const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {
    prompting() {
        if (this.opts.args && 'isTypeScript' in this.opts.args && 'plugins' in this.opts.args) {
            this.prompts = {
                isTypeScript: this.opts.args.isTypeScript,
                plugins: this.opts.args.plugins
            };
        }else{
            const prompts = [
                {
                    type: 'input',
                    name: 'title',
                    message: 'Package Name',
                    default: 'React Template',
                },
                {
                    name: 'isTypeScript',
                    type: 'confirm',
                    message: 'Do you want to use typescript?',
                    default: false,
                },
                {
                    type: 'checkbox',
                    name: 'plugins',
                    message: '插件',
                    choices: [
                        'echarts',
                        'react-virtualized',
                        'dva'
                    ]
                }
            ];
            return this.prompt(prompts).then(props => {
                this.prompts = props;
            });
        }
    }

    writing() {  
        this.writeFiles({
            context: {
                name: this.name,
                ...this.prompts,
            },
            filterFiles: f => {
                const { isTypeScript, plugins } = this.prompts;
                if (isTypeScript) {
                    if (f.endsWith('.js')) return false;
                    if (!plugins.includes('dva')) {
                        if (f.startsWith('src/models') || f === 'src/app.ts') return false;
                    }
                } else {
                    if (this.isTsFile(f)) return false;
                    if (!plugins.includes('dva')) {
                        if (f.startsWith('src/models') || f === 'src/app.js') return false;
                    }
                }
                return true;
            },
        });
    }
}

module.exports = Generator;
