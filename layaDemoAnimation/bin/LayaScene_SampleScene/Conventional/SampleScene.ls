{
	"version":"LAYASCENE3D:01",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"SampleScene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						-10
					],
					"rotation":[
						0,
						1,
						0,
						0
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"fieldOfView":60,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-0.43,
						0.45,
						2.91
					],
					"rotation":[
						0.06458167,
						0.8956633,
						0.4176546,
						-0.1384958
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":1,
					"color":[
						1,
						0.9568627,
						0.8392157
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Cube_1",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-1,
						0.5,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						2,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/Texture/Materials/testTexture.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Cube_2",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						1,
						0.5,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						2,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/Material/Cube_1Material.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					},
					{
						"type":"Animator",
						"layers":[
							{
								"name":"Base Layer",
								"weight":0,
								"blendingMode":0,
								"states":[
									{
										"name":"AnimationTwo",
										"clipPath":"Assets/Animation/AnimationTwo-AnimationTwo.lani"
									}
								]
							}
						],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Cube",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						4.14,
						1.537,
						-3.298
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/Material/CubeMaterial.lmat"
						}
					]
				},
				"components":[
					{
						"type":"Rigidbody3D",
						"mass":1,
						"isKinematic":false,
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"linearDamping":0,
						"angularDamping":0,
						"overrideGravity":false,
						"gravity":[
							0,
							0,
							0
						],
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"Key",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.5,
						-1.18
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						2.952,
						1,
						0.65125
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":true
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Plane",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						3,
						1,
						3
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/Material/PlaneMat.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"MeshColliderShape",
								"mesh":"Library/unity default resources-Plane.lm"
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"BoyModule",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-3.4013,
						-0.023,
						-2.4891
					],
					"rotation":[
						0,
						-0.9974408,
						0,
						-0.0714974
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[
					{
						"type":"Animator",
						"avatar":{
							"path":"Assets/Supercyan Character Pack Free Sample/Animations/common_people@mpose-BoyModule-common_people@mposeAvatar.lav",
							"linkSprites":{}
						},
						"layers":[
							{
								"name":"Base Layer",
								"weight":0,
								"blendingMode":0,
								"states":[
									{
										"name":"Jump",
										"clipPath":"Assets/Supercyan Character Pack Free Sample/Animations/common_people@jump-up-jump-up.lani"
									}
								]
							}
						],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[
					{
						"type":"SkinnedMeshSprite3D",
						"props":{
							"name":"C_man_1_FBX2013",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								4.328877E-08,
								0,
								-5.443854E-08
							],
							"rotation":[
								0.7071068,
								-3.447441E-09,
								-3.447441E-09,
								-0.7071067
							],
							"scale":[
								10,
								10,
								10
							],
							"rootBone":"basic_rig Pelvis",
							"boundBox":{
								"min":[
									-0.02857829,
									-0.02000297,
									-0.02970101
								],
								"max":[
									0.08166648,
									0.01987107,
									0.02970103
								]
							},
							"boundSphere":{
								"center":[
									0.0265441,
									-6.594881E-05,
									6.519258E-09
								],
								"radius":0.06571235
							},
							"materials":[
								{
									"path":"Assets/Supercyan Character Pack Free Sample/Materials/High Quality/free_male_1_body.lmat"
								},
								{
									"path":"Assets/Supercyan Character Pack Free Sample/Materials/High Quality/free_male_1_head.lmat"
								}
							],
							"meshPath":"Assets/Supercyan Character Pack Free Sample/Models/free_male_1-C_man_1_FBX2013.lm"
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"ShuriKenParticle3D",
				"props":{
					"name":"Particle System",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0.1,
						0,
						-3
					],
					"rotation":[
						0.7071068,
						0,
						0,
						-0.7071068
					],
					"scale":[
						1,
						1,
						1
					],
					"isPerformanceMode":true,
					"duration":5,
					"looping":true,
					"prewarm":false,
					"startDelayType":0,
					"startDelay":0,
					"startDelayMin":0,
					"startDelayMax":0,
					"startLifetimeType":0,
					"startLifetimeConstant":5,
					"startLifetimeConstantMin":0,
					"startLifetimeConstantMax":5,
					"startLifetimeGradient":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMin":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMax":{
						"startLifetimes":[]
					},
					"startSpeedType":0,
					"startSpeedConstant":5,
					"startSpeedConstantMin":0,
					"startSpeedConstantMax":5,
					"threeDStartSize":false,
					"startSizeType":0,
					"startSizeConstant":1,
					"startSizeConstantMin":0,
					"startSizeConstantMax":1,
					"startSizeConstantSeparate":[
						1,
						1,
						1
					],
					"startSizeConstantMinSeparate":[
						0,
						0,
						0
					],
					"startSizeConstantMaxSeparate":[
						1,
						1,
						1
					],
					"threeDStartRotation":false,
					"startRotationType":0,
					"startRotationConstant":0,
					"startRotationConstantMin":0,
					"startRotationConstantMax":0,
					"startRotationConstantSeparate":[
						0,
						0,
						0
					],
					"startRotationConstantMinSeparate":[
						0,
						0,
						0
					],
					"startRotationConstantMaxSeparate":[
						0,
						0,
						0
					],
					"randomizeRotationDirection":0,
					"startColorType":0,
					"startColorConstant":[
						1,
						1,
						1,
						1
					],
					"startColorConstantMin":[
						0,
						0,
						0,
						0
					],
					"startColorConstantMax":[
						1,
						1,
						1,
						1
					],
					"gravity":[
						0,
						-9.81,
						0
					],
					"gravityModifier":0,
					"simulationSpace":1,
					"scaleMode":1,
					"playOnAwake":true,
					"maxParticles":1000,
					"autoRandomSeed":true,
					"randomSeed":7.063039E+08,
					"emission":{
						"enable":true,
						"emissionRate":10,
						"emissionRateTip":"Time",
						"bursts":[]
					},
					"shape":{
						"enable":true,
						"shapeType":2,
						"sphereRadius":1,
						"sphereEmitFromShell":false,
						"sphereRandomDirection":0,
						"hemiSphereRadius":1,
						"hemiSphereEmitFromShell":false,
						"hemiSphereRandomDirection":0,
						"coneAngle":25,
						"coneRadius":1,
						"coneLength":5,
						"coneEmitType":0,
						"coneRandomDirection":0,
						"boxX":1,
						"boxY":1,
						"boxZ":1,
						"boxRandomDirection":0,
						"circleRadius":1,
						"circleArc":360,
						"circleEmitFromEdge":false,
						"circleRandomDirection":0
					},
					"renderMode":0,
					"stretchedBillboardCameraSpeedScale":0,
					"stretchedBillboardSpeedScale":0,
					"stretchedBillboardLengthScale":2,
					"sortingFudge":0,
					"material":{
						"type":"Laya.ShurikenParticleMaterial",
						"path":"Assets/Material/ParticleMat1.lmat"
					}
				},
				"components":[],
				"child":[]
			}
		]
	}
}