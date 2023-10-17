import {readFileSync, existsSync, unlinkSync, writeFileSync} from 'fs';

main();
function main() {
    const {version} = JSON.parse(readFileSync('package.json'));
    const filePath = 'src/version.ts';
    if(existsSync(filePath)) {
        unlinkSync(filePath)
    }
    writeFileSync(filePath, `export const version = "${version}";`);
}