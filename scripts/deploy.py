from unittest import mock
from brownie import accounts, config, Quiz, MockV3Aggregator, network
from scripts.helpful_scripts import (
    get_account, 
    deploy_mocks, 
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)

def deploy_quiz():
    print("starting deployment")
    account = get_account()
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        price_feed_address = config["networks"][network.show_active()][
            "eth_usd_price_feed"
        ]
    else:
        print(f"The active network is {network.show_active()}")
        deploy_mocks()
        price_feed_address = MockV3Aggregator[-1].address

    quiz = Quiz.deploy(
        price_feed_address,
        {"from":account}, 
        publish_source=config["networks"][network.show_active()].get("verify"),
    )
    print(f"Contract deployed to {quiz.address}")
    return quiz

def main():
    deploy_quiz()