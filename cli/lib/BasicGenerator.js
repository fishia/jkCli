const Generator = require('yeoman-generator');
const glob = require('glob');
const { statSync } = require('fs');
const { basename } = require('path');

function noop() {
    return true;
}

class BasicGenerator extends Generator {
    constructor(opts) {
        super(opts);
        this.opts = opts;
        this.name = basename(opts.env.cwd);
    }
    isTsFile(f) {
        return f.endsWith('.ts') || f.endsWith('.tsx') || !!/(tsconfig\.json)/g.test(f);
    }
    writeFiles({ context, filterFiles = noop }) {
        glob.sync('**/*', {
            cwd: this.templatePath(),
            dot: true,
        })
            .filter(filterFiles)
            .forEach(file => {
                const filePath = this.templatePath(file);
                if (statSync(filePath).isFile()) {
                    this.fs.copyTpl(
                        this.templatePath(filePath),//from
                        this.destinationPath(file.replace('.npmignore', '.gitignore').replace(/^_/, '.')),//to
                        context,
                    );
                }
            });
    }
}

module.exports = BasicGenerator;
