import router from '@adonisjs/core/services/router'

const ShortersController = () => import('#controllers/shorters_controller')

router.get('/', [ShortersController, 'create'])

router.post('/shorten', [ShortersController, 'store'])

router.get('/:shortCode', [ShortersController, 'redirect'])
