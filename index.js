const koa = require('koa');
const json = require('koa-json');
const koaRouter = require('koa-router');
const render = require('koa-ejs');
const bodyparser = require('koa-bodyparser')
const path = require('path');

const app = new koa();

app.use(json());

app.use(bodyparser());

const router = new koaRouter();

const champions = ['Maestro yi', 'Olaf']

//setting the router middleware

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
});

app.use(router.routes()).use(router.allowedMethods());

router.get('/test', async ctx => ctx.body = { 'msg':'Helloooo' });

router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'My favorite champions',
        champions: champions,
    });
});

router.get('/add-champion', async ctx => { 
    await ctx.render('add')
});

router.post('/add-champion', addChampion);

async function addChampion(ctx) {
    const body = ctx.request.body;
    const champion = body.champion;
    champions.push(champion);
    ctx.redirect('/')
};

app.use( async ctx => ctx.body = { 'msg':'Helloooo' });

app.listen( 5000, () => {
    console.log('App is started on Port 5000');
});